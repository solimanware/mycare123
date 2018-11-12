const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', patientController.findAll);

router.post('/', patientController.create);

router.get('/:id', patientController.findById);

router.patch('/:id', patientController.update);

module.exports = router;