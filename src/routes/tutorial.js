const express = require('express');
const router = express.Router();
const verifyToken = require('../app/middleware/auth')

const tutorialController = require('../app/controllers/TutorialController');


router.get('/published',tutorialController.findPublished)

router.get('/:id',tutorialController.findById)
router.put('/:id',tutorialController.updateById)
router.delete(':/id',tutorialController.deleteById)

router.get('/',tutorialController.findAll)
router.post('/',verifyToken,tutorialController.create)
router.delete('/',tutorialController.deleteAll)


module.exports = router;
