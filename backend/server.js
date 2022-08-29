const express = require('express')
const path = require('path')
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
    res.status(200).json({message: 'Welcome to the Support Desk API'})
})

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

//Serve frontend
if(process.env.NODE_ENV === 'production') {
    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
}else{
    app.get('/', (req, res) => {
        res.status(200).json({message: 'Welcome to the Support Desk API'}) })
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT} `)
})