require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3001

const products = require('./data/products')

connectDB()

app.get('/', (req, res) => {
	res.send('API is running.')
})

app.get('/api/products', (req, res) => {
	res.json(products)
})

app.get('/api/products/:id', (req, res) => {
	const product = products.find((p) => p._id === req.params.id)
	res.json(product)
})

app.listen(
	PORT,
	console.log(
		`Server running on port ${PORT} running in ${process.env.NODE_ENV}`
	)
)
