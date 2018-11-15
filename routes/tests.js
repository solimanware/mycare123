const express = require('express');
const testsController = require('../controllers/testsController');

const router = express.Router();

router.get('/', testsController.findAll);

router.post('/', testsController.create);

router.get('/:id', testsController.findById);

router.patch('/:id', testsController.update);

router.delete('/:id', testsController.delete);

module.exports = router;