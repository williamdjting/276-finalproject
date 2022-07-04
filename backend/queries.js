const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// return all user data
const getUser = (request, response) => {
    const userid = parseInt(request.params.userid);
    pool.query('SELECT * FROM $1', [userid], (error, results) => {
      if (error) {
        throw error
      }
      // returns the results found as JSON
      response.status(200).json(results.rows)
    })
}
  
// returns all users based on ID
const getTransactionsById = (request, response) => {
  const userid = parseInt(request.params.userid);
  const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM $1 WHERE id = $2', [id], (error, results) => {
      if (error) {
        throw error
      }
      // returns the results found as JSON
      response.status(200).json(results.rows)
    })
}
  
// create a new user
// NOTE: fields are all varchar to handle bad input data to avoid crashes
const createUser = (request, response) => {
  const { name, weight, height, hair_color, gpa, international, account_balance, credits } = request.body
  
    pool.query('INSERT INTO students (name, weight, height, hair_color, gpa, international, account_balance, credits) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [name, weight, height, hair_color, gpa, international, account_balance, credits], (error, results) => {
      if (error) {
        throw error
      }
      // returns a response for success, not json
      response.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
}
  
// updates existing user entry
const updateUser = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, weight, height, hair_color, gpa, international, account_balance, credits } = request.body
  
    pool.query(
      'UPDATE students SET name = $1, weight = $2, height = $3, hair_color = $4, gpa = $5, international =$6, account_balance = $7, credits = $8 WHERE id = $9',
      [name, weight, height, hair_color, gpa, international, account_balance, credits, id],
      (error, results) => {
        if (error) {
          throw error
        }
      // returns a response for success, not json
        response.status(200).send(`User modified with ID: ${id}`)
      }
    )
}
  
// deletes user from a given id
const deleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM students WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${id}`)
    })
}
  
// export methods to routing
module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  }
