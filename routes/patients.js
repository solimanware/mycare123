const express = require('express');
const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', patientController.findAll);

router.post('/', patientController.create);

router.get('/search', patientController.search);

router.get('/:id', patientController.findById);

router.patch('/:id', patientController.update);

router.delete('/:id', patientController.delete);

module.exports = router;