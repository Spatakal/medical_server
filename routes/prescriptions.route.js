const express = require('express');
const router = express.Router();
const Controller = require('../controllers/prescriptions.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/add', Controller.addPrescription);
router.get('/all', Controller.getPrescriptions);
router.get('/user/:user_id', Controller.getUserPrescriptions);
router.get('/:id', Controller.getPrescription);

module.exports = router;
