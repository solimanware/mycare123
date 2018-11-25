const express = require('express');
const itemsResultController = require('../controllers/itemsResultController');


const router = express.Router();

router.get('/', itemsResultController.findAll);


router.get('/visit/{visit_id}`', itemsResultController.findAllByVisit);
router.get('/:id', itemsResultController.findById);

router.post('/', itemsResultController.create);


router.patch('/:id', itemsResultController.update);

router.delete('/:id', itemsResultController.delete);

module.exports = router;