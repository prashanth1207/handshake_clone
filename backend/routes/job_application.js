var express = require('express');
var router = express.Router();
let JobApplicationController = require('./../controllers/jobApplicationController');
let checkAuth = require('./../config/passport').checkAuth;

router.get('/', checkAuth, JobApplicationController.get_job_applications_for_a_job_posting);
router.post('/create', checkAuth, JobApplicationController.create_job_application);
router.post('/status', checkAuth, JobApplicationController.getApplicationStatus);
router.post('/:id/set_status', checkAuth, JobApplicationController.setApplicationStatus);
router.get('/student_applications/:studentProfileId', checkAuth, JobApplicationController.get_job_applications_for_a_student);

module.exports = router;