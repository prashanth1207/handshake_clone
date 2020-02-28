var express = require('express');
var router = express.Router();
let UserController = require('./../controllers/userController')

/* Login and registration */
router.post('/login', UserController.post_login);
router.post('/register', UserController.post_register);

module.exports = router;
