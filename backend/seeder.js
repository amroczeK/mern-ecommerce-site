require('dotenv').config()
const mongoose = require('mongoose')
const users = require('./data/users')
const products = require('./data/products')
const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')
const connectDB = require('./config/db')

connectDB()

const importData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()

		const createdUsers = await User.insertMany(users)
		const adminUser = createdUsers[0]._id
		const sampleProducts = products.map((product) => {
			return { ...product, user: adminUser }
    })
    
    await Product.insertMany(sampleProducts)
    console.log('Data imported')
    process.exit()
	} catch (error) {
    console.log(error)
    process.exit(1)
  }
}

const destroyData = async () => {
	try {
		await Order.deleteMany()
		await Product.deleteMany()
		await User.deleteMany()
    console.log('Data destroyed')
    process.exit()
	} catch (error) {
    console.log(error)
    process.exit(1)
  }
}

process.argv[2] === '-d' ? destroyData() : importData()