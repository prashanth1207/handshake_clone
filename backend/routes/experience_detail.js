var express = require('express');
var router = express.Router();
let ExperienceDetailController = require('../controllers/experienceDetailController');
let checkAuth = require('./../config/passport').checkAuth;

router.post('/create_update', checkAuth, ExperienceDetailController.createOrUpdateExperienceDetail);
router.post('/delete/:id', checkAuth, ExperienceDetailController.deleteExperienceDetail);

module.exports = router;