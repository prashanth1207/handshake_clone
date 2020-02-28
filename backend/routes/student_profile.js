var express = require('express');
var router = express.Router();
let StudentProfileController = require('./../controllers/studentProfileController')


/* GET home page. */
router.get('/:id', StudentProfileController.get_student_profile);
router.post('/:id', StudentProfileController.update_student_profile);
module.exports = router;