var express = require('express');
var router = express.Router();
let JobApplicationController = require('./../controllers/jobApplicationController');

router.get('/', JobApplicationController.get_job_applications_for_a_job_posting);
router.post('/create', JobApplicationController.create_job_application);
router.post('/status', JobApplicationController.getApplicationStatus);
router.post('/:id/set_status', JobApplicationController.setApplicationStatus);
router.get('/student_applications/:studentProfileId', JobApplicationController.get_job_applications_for_a_student);

module.exports = router;