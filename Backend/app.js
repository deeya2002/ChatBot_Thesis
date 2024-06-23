const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const connectToDB = require('./database/db')
const acceptMultimedia = require('connect-multiparty')

require("dotenv").config()

const app = express()

//connect to database
connectToDB();

app.use(express.json())
//cors config to accept request from frontend
const corsOptions = {
    origin: true,
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(routes)
app.use(acceptMultimedia())

module.exports = app