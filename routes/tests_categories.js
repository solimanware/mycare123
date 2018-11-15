const express = require('express');
const testsCategory = require('../controllers/testsCategoryController');

const router = express.Router();

router.get('/', testsCategory.findAll);

router.post('/', testsCategory.create);

router.get('/:id', testsCategory.findById);

router.patch('/:id', testsCategory.update);

router.delete('/:id', testsCategory.delete);

module.exports = router;