const express = require('express')
const app = express()
const port = 3000

app.listen(port, () => console.log(`Example app listening at http:localhost:${port}`))

const fs = require('fs')

const students = JSON.parse(fs.readFileSync('student.json'))

app.get('/student', (req, res) => {
    //if(req.query.search) {
    const selectedStudents = students.filter(student => student.studentName === req.query.search)
    //}

    console.log(req.query.search)
    res.send(selectedStudents)
})

app.get('/student/:id', (req, res) => {
    const selectedStudent = students.find(student => student.id === Number(req.params.id))
    console.log(req.params)
    res.send(selectedStudent)
    })

    
app.get('/grades/:id', (req, res) => {
    const selectedStudent = students.find(student => student.id === Number(req.params.id))
    console.log(req.params)
    res.send(selectedStudent.grades)
    })

app.get('/grades', (req, res) => {
    const selectedStudent = students.find(student => student.id === Number(req.params.id))
    console.log(req.params)
    res.send(selectedStudent.grades)
    })



app.post('/students/:id/grades', (req, res) => {
    res.send(200, `Grade: ${req.body} was successfully added`)
})

app.post('/register', (req, res) => {
    res.json({ user: 'tobi' })
    res.status(200).json({ message: 'success' })
})

//GET student - returns a list of all students ++
//GET students/:studentId - returns details of a specific student by student id ++
//GET student?search= - returns a list of students filtered on name matching the given query ++
//GET grades/:studentId - returns all grades for a given student by student id  ++
//POST grade - records a new grade, returns success status in JSON response (meaning you do not need to actually store the grade in a database. You do need to validate that the user supplied at least a grade, and a studentId)
//POST register - creates a new user, returns success status in JSON response (meaning you do not need to actually store the user info in a database. You do need to validate that the user supplied username and email)


