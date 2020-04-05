var express = require('express');
var router = express.Router();
let CompanyProfileController = require('./../controllers/companyProfileController')
let checkAuth = require('./../config/passport').checkAuth;

/* GET home page. */
router.get('/:id', checkAuth, CompanyProfileController.get_company_profile);
router.post('/:id', checkAuth, CompanyProfileController.update_company_profile);


module.exports = router;