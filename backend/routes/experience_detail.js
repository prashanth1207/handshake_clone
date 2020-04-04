var express = require('express');
var router = express.Router();

let ExperienceDetailController = require('../controllers/experienceDetailController');

router.post('/create_update',ExperienceDetailController.createOrUpdateExperienceDetail);
router.post('/delete/:id',ExperienceDetailController.deleteExperienceDetail);

module.exports = router;