const ProductRoutes = require('../routes/products')
const UserRoutes = require('../routes/users')
const OrderRoutes = require('../routes/orders')

const setupRouting = (app) => {
	console.log('Setting up routes.')
	app.use('/api/products', ProductRoutes)
	app.use('/api/users', UserRoutes)
	app.use('/api/orders', OrderRoutes)
}

module.exports = setupRouting
