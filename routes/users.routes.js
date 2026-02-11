const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/', userController.addUser);
router.get('/', userController.fetchUsers);

module.exports = router;
