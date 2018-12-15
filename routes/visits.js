const express = require('express');
const visitController = require('../controllers/visitController');

const router = express.Router();

router.get('/', visitController.findAll);

router.post('/', visitController.create);

router.get('/:id', visitController.findById);

router.get('/:id/results', visitController.findResultsByVisitId);

router.get('/:id/results-report', visitController.findResultsReportByVisitId);

router.patch('/:id', visitController.update);

router.patch('/:id/results', visitController.updateResults);


router.delete('/:id', visitController.remove);

module.exports = router;