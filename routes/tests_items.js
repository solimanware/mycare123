const express = require('express');
const testsItemsController = require('../controllers/testsItemsController');

const router = express.Router();

router.get('/', testsItemsController.findAll);

router.post('/', testsItemsController.create);

router.get('/:id', testsItemsController.findById);

router.patch('/:id', testsItemsController.update);

router.delete('/:id', testsItemsController.delete);

module.exports = router;