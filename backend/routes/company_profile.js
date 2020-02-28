var express = require('express');
var router = express.Router();
let CompanyProfileController = require('./../controllers/companyProfileController')


/* GET home page. */
router.get('/:id', CompanyProfileController.get_company_profile);
router.post('/:id', CompanyProfileController.update_company_profile);


module.exports = router;