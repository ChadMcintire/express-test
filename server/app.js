const fs = require("fs")
const bodyParser = require("body-parser")

const express = require('express')
const db = require('./queries')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'The final count down dum de dum ' })
})

app.get('/movies', db.getMovies)
app.get('/movies/:id', db.getMovieById)
app.get('/reviews/:id', db.getReviewsById)
app.post("/reviews", db.createReviews) 
app.post("/register", db.createUser) 


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})



/// POST register - create a new user app.post('/register', jsonParser, (req, res) => { console.log("POST register new user") console.log(req.body)
//app.post("/grade", jsonParser, (req, res) => { console.log("POST grade for studentId")
//var jsonParser = bodyParser.json()
