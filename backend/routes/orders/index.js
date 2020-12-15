const router = require('express').Router();
const controller = require('../../controllers/orders');
const protect = require('../../middleware/authorization');

router.route('/').post(protect, controller.addOrderItems);
router.route('/myorders').get(protect, controller.getMyOrders);
router.route('/:id').get(protect, controller.getOrderbyId);
router.route('/:id/pay').put(protect, controller.updateOrderToPaid);

module.exports = router;
