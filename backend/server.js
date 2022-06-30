const express = require('express')
const { errorHandler } = require('./middleware/errorMiddleware')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 6000
const app = express()
const colors = require('colors')

//Connect to database
connectDB()


app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.status(200).json({message: 'hello'})
})

app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} `)
})