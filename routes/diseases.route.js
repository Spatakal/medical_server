const express = require('express');
const router = express.Router();
const DiseaseController = require('../controllers/diseases.controller');
const auth = require('../authentication/middleware/auth.middleware');

router.post('/add', DiseaseController.addDisease);
router.get('/all', DiseaseController.getDiseases);
router.get('/:id', DiseaseController.getDisease);

module.exports = router;
