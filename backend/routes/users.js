var express = require('express');
var router = express.Router();
console.log('user js');
import UserController from './../controllers/userController';

/* Login and registration */
router.get('/login', UserController.get_login);
router.post('/login', UserController.post_login);
router.get('/student_register', UserController.get_student_register);
router.post('/student_register', UserController.post_student_register);
router.get('/company_register', UserController.get_company_register);
router.post('/company_register', UserController.post_company_register);

module.exports = router;
