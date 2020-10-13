require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const setupRouting = require('./config/routing')
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())

connectDB()

setupRouting(app)

app.listen(
	PORT,
	console.log(
		`Server running on port ${PORT} running in ${process.env.NODE_ENV}`
	)
)
