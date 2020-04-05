var express = require('express');
var router = express.Router();
let checkAuth = require('./../config/passport').checkAuth;

let EducationDetailController = require('../controllers/educationDetailController');

router.post('/create_update', checkAuth, EducationDetailController.createOrUpdateEducationDetail);
router.post('/delete/:id', checkAuth, EducationDetailController.deleteEducationDetail);

module.exports = router;