const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();

router.get('/', visitController.findAll);

router.post('/', visitController.create);

router.get('/:id', visitController.findById);

router.get('/:id/results', visitController.findResultsByVisitId);


router.patch('/:id', visitController.update);

router.patch('/:id/results', visitController.updateResults);


router.delete('/:id', visitController.delete);

module.exports = router;