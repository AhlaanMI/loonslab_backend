const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
require('dotenv').config();

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect(process.env.MONGODB)
.then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.post("/login", (req,res) => {
    const {email,password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password){
                res.json("Success")
            } else{
                res.json("the password is incorrect")
            }
        } else{
            res.json("No record existed")
        }
    })
})

app.post('/register', (req,res) => {
    EmployeeModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
})

// Add a new route to fetch all employees
app.get('/employees', (req, res) => {
    EmployeeModel.find()
        .then(employees => res.json(employees))
        .catch(err => res.status(500).json({ error: err.message }));
});

// DELETE endpoint to delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete(id)
        .then(() => res.json({ message: 'Employee deleted successfully' }))
        .catch(err => res.status(500).json({ error: err.message }));
});



app.listen(3001, () => {
    console.log("server is running")
})