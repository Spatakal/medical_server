const express = require('express');
const router = express.Router();
const auth = require('../authentication/middleware/auth.middleware');

const {
  createMap,
  doctorsByDisease,
  diseasesByDoctor
} = require('../controllers/doctor_disease_map.controller');

router.post('/map', createMap);
router.get('/doctors/:disease_id', doctorsByDisease);
router.get('/diseases/:doctor_id', diseasesByDoctor);

module.exports = router;
