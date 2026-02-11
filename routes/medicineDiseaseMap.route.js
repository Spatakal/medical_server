const express = require('express');
const router = express.Router();
const Controller = require('../controllers/medicineDiseaseMap.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/map', Controller.createMap);
router.get('/medicines/:disease_id', Controller.medicinesByDisease);
router.get('/diseases/:medicine_id', Controller.diseasesByMedicine);

module.exports = router;
