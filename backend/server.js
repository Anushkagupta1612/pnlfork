const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config();
connectDB();

const app = express()

app.use(bodyParser.json())

// Available routes 
app.use('/auction',require('./routes/auction'))
app.use('/leaderboard',require('./routes/leaderboard'))
app.use('/profile',require('./routes/profile'))
app.use('/trading',require('./routes/trading'))

const PORT = process.env.PORT || 3005
app.listen(PORT,console.log(`Server Started on PORT ${PORT}`))