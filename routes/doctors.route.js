const express = require('express');
const router = express.Router();
const DoctorController = require('../controllers/doctors.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/add', DoctorController.addDoctor);
router.get('/all', DoctorController.getDoctors);
router.get('/search', DoctorController.getDoctorsBySpec);
router.get('/:id', DoctorController.getDoctor);

module.exports = router;
