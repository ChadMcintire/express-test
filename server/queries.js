const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'students',
  password: 'password',
  port: 5432,
})


const getMovies = (request, response) => {
  pool.query('SELECT * FROM movies ORDER BY movieid ASC', (error, results) => {
    if (error) {
      throw error
    }
    rows = results.rows
    if(request.query.search) {
      rows= rows.filter(row => row.title === request.query.search)
    }

    response.status(200).json(rows)
  })
}


const getMovieById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM movies WHERE movieid = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}


const getReviewsById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT m.movieid, m.title, r.review ' +
             'FROM movies m ' +
             'JOIN reviews r ON r.movieid = m.movieid ' +
             'WHERE m.movieid = $1',
             [id], (error, results) => {

    if (error) {
      throw error
    }

    rows = results.rows
    response.status(200).json(rows)
  })
}

const createReviews = (req, res) => { 
  const movieid = parseInt(req.body.movieid)
  const review = req.body.review
  const userid = parseInt(req.body.userid)

  pool.query('INSERT INTO reviews ' +
             '(movieid, userid, review) ' +
             'VALUES ($1, $2, $3)',
             [movieid, userid, review], (error, results) => {

    if (error) {
      throw error
    }

    res.status(200).send("Everything is good")
  })
}


const createUser = (req, res) => { 
  const username = req.body.username

  pool.query('INSERT INTO users' +
             '(username) ' +
             'VALUES ($1)',
             [username], (error, results) => {

    if (error) {
      throw error
    }

    res.status(200).send("Everything is good")
  })
}


module.exports = {
  getMovies,
  getMovieById,
  getReviewsById,
  createReviews, 
  createUser, 
}
