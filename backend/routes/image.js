var express = require('express');
var router = express.Router();
let ImageController = require('../controllers/imageController');

router.get('/profile_pics/:imageId', ImageController.renderImage);

module.exports = router;