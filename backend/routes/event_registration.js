var express = require('express');
var router = express.Router();
let EventRegistrationController = require('./../controllers/eventRegistrationController');

router.get('/',EventRegistrationController.get_registrations);
router.post('/',EventRegistrationController.create_registration);
router.get('/student_registered',EventRegistrationController.is_student_registered);


module.exports = router;