const Order = require('../../models/orderModel');
const asyncHandler = require('express-async-handler');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    subTotal,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    //res.status(400)
    throw new Error('No order items');
  }
  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    subTotal,
  });
  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderbyId = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(400);
    throw new Error('Order not found');
  }
  res.status(200).json(order);
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.payer.email_address,
      };

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.toString() });
  }
};

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/delivered
// @access  Private/Admin
const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();

      res.json(updatedOrder);
    } else {
      throw new Error('Order not found');
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.toString() });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (orders) {
      res.json(orders);
    } else {
      throw new Error('No orders found');
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.toString() });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    if (orders) {
      res.json(orders);
    } else {
      throw new Error('No orders found');
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.toString() });
  }
};

module.exports = {
  addOrderItems,
  getOrderbyId,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getAllOrders,
};
