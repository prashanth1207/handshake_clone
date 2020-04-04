var express = require('express');
var router = express.Router();

let EducationDetailController = require('../controllers/educationDetailController');

router.post('/create_update',EducationDetailController.createOrUpdateEducationDetail);
router.post('/delete/:id',EducationDetailController.deleteEducationDetail);

module.exports = router;