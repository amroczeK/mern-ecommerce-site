const ProductRoutes = require("../routes/products");

const setupRouting = (app) => {
	console.log('Setting up routes.');
	app.use("/api/products", ProductRoutes);
};

module.exports = setupRouting