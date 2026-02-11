const express = require('express');
const router = express.Router();
const Controller = require('../controllers/orders.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/add', Controller.addOrder);
router.get('/all', Controller.getOrders);
router.get('/user/:user_id', Controller.getUserOrders);
router.get('/:id', Controller.getOrder);
router.put('/status/:id', Controller.changeOrderStatus);

module.exports = router;
