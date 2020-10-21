const ProductRoutes = require('../routes/products')
const UserRoutes = require('../routes/users')

const setupRouting = (app) => {
	console.log('Setting up routes.')
	app.use('/api/products', ProductRoutes)
	app.use('/api/users', UserRoutes)
}

module.exports = setupRouting
