const pool = require("./db");

// create a new user
// NOTE: fields are all varchar to handle bad input data to avoid crashes
const createUser = (request, response) => {
    const { username, password, name } = request.body

    pool.query(
        'INSERT INTO loginauth (username, password, nickname) VALUES ("$1", "$2", "$3") RETURNING *',
        [username, password, name], (error, results) => {
            if (error) {
                throw error
            }
            // returns a response for success, not json
            response.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
}

const generateUserTable = (request, response) => {
    const { userid } = request.body

    pool.query(
        'CREATE TABLE userid_$1 (req_sent BIT, date DATE, receiverid INT, amount INT, paid BIT )',
        [userid], (error, results) => {
            if (error) {
                throw error
            }
            // returns a response for success, not json
            response.status(201).send(`User table generated`)
        })
}

// return all user info found in datatable
// william
const getAllUserData = (request, response) => {
  const userid = parseInt(request.params.userid);
  pool.query(
      'SELECT * FROM dummytable', (error, results) => {
    if (error) {
      throw error
    }
    // returns the results found as JSON
    response.status(200).json(results.rows)
  })
}


// return user nickname
const getUserData = (request, response) => {
    const userid = parseInt(request.params.userid);
    pool.query(
        'SELECT * FROM userid_$1',
        [userid], (error, results) => {
            if (error) {
                throw error
            }
            // returns the results found as JSON
            response.status(200).json(results.rows)
        })
}

// updates existing user entry
const updateNickname = (request, response) => {
    const id = parseInt(request.params.id)
    const { nickname, userid } = request.body

    pool.query(
        'UPDATE loginauth SET nickname = $1 WHERE userid = $2',
        [nickname, userid],
        (error, results) => {
            if (error) {
                throw error
            }
            // returns a response for success, not json
            response.status(200).send(`User modified with new nickname: ${nickname}`)
        }
    )
}

// updates existing user entry
const updatePassword = (request, response) => {
    const { password, userid } = request.body

    pool.query(
        'UPDATE loginauth SET password = $1 WHERE userid = $2',
        [password, userid],
        (error, results) => {
            if (error) {
                throw error
            }
            // returns a response for success, not json
            response.status(200).send(`User modified with new password`)
        }
    )
}

// updates existing user entry
const resetPassword = (request, response) => {
    const { userid } = request.body

    pool.query(
        'UPDATE loginauth SET password = "password" WHERE userid = $1',
        [userid],
        (error, results) => {
            if (error) {
                throw error
            }
            // returns a response for success, not json
            response.status(200).send(`User modified with new password`)
        }
    )
}

// deletes user from a given id
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query(
        'DELETE FROM loginauth WHERE id = $1\n' +
        'DROP TABLE userid_$1',
        [id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User deleted with ID: ${id}`)
        })
}

// return user nickname
const getUserNickname = (request, response) => {
    const userid = parseInt(request.params.userid);
    pool.query(
        'SELECT nickname FROM loginauth WHERE userid = $1',
        [userid], (error, results) => {
            if (error) {
                throw error
            }
            // returns the results found as JSON
            response.status(200).json(results.rows)
        })
}

// get all from login auth
const getAllUsers = (request, response) => {

    pool.query(
        'SELECT * FROM loginauth u WHERE u.type=$1',["regular"],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows);
           // response.send(results.rows);
        })
}


// export methods to routing
module.exports = {
    createUser,
    generateUserTable,
    getUserData,
    updateNickname,
    updatePassword,
    resetPassword,
    deleteUser,
    getUserNickname,
    getAllUsers
}
