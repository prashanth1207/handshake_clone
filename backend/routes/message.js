var express = require('express');
var router = express.Router();
let MessageController = require('./../controllers/messageController');
let checkAuth = require('./../config/passport').checkAuth;


/* GET home page. */
router.post('/startConversation', MessageController.startConversation);
router.get('/:id', MessageController.getMessageWindow);
router.post('/send_message', MessageController.sendMessage);
router.get('/student/:id',MessageController.getMessageWindowsForStudent);
router.get('/company/:id',MessageController.getMessageWindowsForCompany);
module.exports = router;