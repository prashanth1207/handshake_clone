var express = require('express');
var router = express.Router();
let StudentProfileController = require('./../controllers/studentProfileController')


/* GET home page. */
router.get('/',StudentProfileController.get_all_students_profile)
router.get('/:id', StudentProfileController.get_student_profile);
router.post('/:id', StudentProfileController.update_student_profile);
router.post('/:id/upload_profile_pic',StudentProfileController.upload_profile_pic);
module.exports = router;