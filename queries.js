const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 5432,
})


const getStudents = (request, response) => {
  pool.query('SELECT * FROM students ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    rows = results.rows
    if(request.query.search) {
      rows= rows.filter(row => row.fname === request.query.search)
    }

    response.status(200).json(rows)
  })
}


const getStudentById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM students WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getGradesById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT s.id, s.fname, dada, potions ' +
             'FROM students s ' +
             'LEFT JOIN grades g ON g.id = s.id ' +
             'WHERE s.id = $1',
             [id], (error, results) => {

    if (error) {
      throw error
    }

    rows = results.rows
    response.status(200).json(rows)
  })
}


module.exports = {
  getStudents,
  getStudentById,
  getGradesById,
}
