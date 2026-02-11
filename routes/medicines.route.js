const express = require('express');
const router = express.Router();
const MedicineController = require('../controllers/medicines.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/add', MedicineController.addMedicine);
router.get('/all', MedicineController.getMedicines);
router.get('/:id', MedicineController.getMedicine);

module.exports = router;
