const router = require('express').Router();
const controller = require('../../controllers/orders');
const { protect, isAdmin } = require('../../middleware/authorization');

router.route('/').get(protect, isAdmin, controller.getAllOrders).post(protect, controller.addOrderItems);
router.route('/myorders').get(protect, controller.getMyOrders);
router.route('/:id').get(protect, controller.getOrderbyId);
router.route('/:id/pay').put(protect, controller.updateOrderToPaid);
router.route('/:id/delivered').put(protect, isAdmin, controller.updateOrderToDelivered);

module.exports = router;
