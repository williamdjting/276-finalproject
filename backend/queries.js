const pool = require("./db");
var format = require('pg-format');
const bcrypt = require("bcrypt");

// create a new user
// NOTE: fields are all varchar to handle bad input data to avoid crashes
const createUser = (request, response) => {
    const { username, password, name } = request.body

    return new Promise(function (resolve, reject) {
        pool.query(
            'INSERT INTO loginauth (username, password, nickname) VALUES ($1, $2, $3) RETURNING *',
            [username, password, name], (error, results) => {
                if (error) {
                    return reject(error);
                }
                response.status(200);
                resolve(results);
                }
        )
    })
}
// generates an empty user table
const generateUserTable = (request, response) => {
    const { userid } = request.body;
    
    let sql = format('CREATE TABLE %I (req_sent BOOL, date DATE, receiverid INT, amount INT, paid BOOL )', "user".concat(userid));

    pool.query( sql, (error, results) => {
            if (error) {
                throw error
            }
        })
}

// return all user info found in datatable
// william
const getAllUserData = (request, response) => {
  const userid = parseInt(request.params.userid);
  pool.query(
      
      'SELECT * FROM dummytable',
      
      (error, results) => {
    if (error) {
      throw error
    }
    // returns the results found as JSON
    response.status(200).json(results.rows)
  })
}


// returns user Data table
const getUserData = (request, response) => {
    const userid = parseInt(request.params.userid);
    console.log(format('SELECT * FROM %I', 'user'.concat(userid)));
    pool.query(
        format('SELECT * FROM %I', 'user'.concat(userid)),
        (error, results) => {
            if (error) {
                throw error
            }
            // returns the results found as JSON
            response.status(200).json(results.rows)
        })
}

// updates existing user entry
const updateNickname = (request, response) => {
    const id = parseInt(request.params.id);
    const nickname = request.body.input;
    const userid = request.body.id;
    //console.log(request.body.id);

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
const updatePassword = async (request, response) => {
    const password = request.body.input;
    const userid  = request.body.id;

    const hashedPass = await bcrypt.hash(password, 10);

    pool.query(
        'UPDATE loginauth SET password = $1 WHERE userid = $2',
        [hashedPass, userid],
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
        format('DELETE FROM loginauth WHERE id = %I; DROP TABLE %I', id, 'user'.concat(id)),
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
        format("SELECT * FROM loginauth WHERE type != '%I' OR type IS NULL  ", 'admin'),
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
