var express = require('express');
var router = express.Router();
let EventRegistrationController = require('./../controllers/eventRegistrationController');
let checkAuth = require('./../config/passport').checkAuth;

router.get('/',checkAuth, EventRegistrationController.get_registrations);
router.post('/',checkAuth, EventRegistrationController.create_registration);
router.get('/student_registered',checkAuth, EventRegistrationController.is_student_registered);


module.exports = router;