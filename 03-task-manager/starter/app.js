const express = require('express');
const app = express();
const tasks = require('./routes/tasks.js') //B step router
const connectDB = require('./db/connect')
require('dotenv').config()

// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('Hello')
})

app.use('/api/v1/tasks', tasks) // A step router

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}....`))
    } catch (error) {
        console.log(error)
    }
}

start()
