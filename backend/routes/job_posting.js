var express = require('express');
var router = express.Router();
let JobPostingController = require('./../controllers/jobPostingController');
let checkAuth = require('./../config/passport').checkAuth;


/* GET home page. */
router.get('/', checkAuth, JobPostingController.show_all_job_postings);
router.get('/:id', checkAuth, JobPostingController.get_job_posting);
router.post('/:company_profile_id/create', checkAuth, JobPostingController.create_job_posting);
module.exports = router;