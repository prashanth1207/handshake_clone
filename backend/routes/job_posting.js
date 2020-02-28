var express = require('express');
var router = express.Router();
let JobPostingController = require('./../controllers/jobPostingController')


/* GET home page. */
router.get('/', JobPostingController.show_all_job_postings);
router.get('/:id', JobPostingController.get_job_posting);
router.post('/:company_profile_id/create', JobPostingController.create_job_posting);
module.exports = router;