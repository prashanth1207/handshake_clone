var express = require('express');
var router = express.Router();
let StudentProfileController = require('./../controllers/studentProfileController')
let checkAuth = require('./../config/passport').checkAuth;


/* GET home page. */
router.get('/', checkAuth, StudentProfileController.get_all_students_profile)
router.get('/:id', checkAuth, StudentProfileController.get_student_profile);
router.post('/:id', checkAuth, StudentProfileController.update_student_profile);
router.post('/:id/upload_profile_pic', checkAuth, StudentProfileController.upload_profile_pic);
module.exports = router;