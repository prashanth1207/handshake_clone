var express = require('express');
var router = express.Router();
let MessageController = require('./../controllers/messageController');
let checkAuth = require('./../config/passport').checkAuth;


/* GET home page. */
router.post('/startConversation', checkAuth, MessageController.startConversation);
router.get('/:id', checkAuth, MessageController.getMessageWindow);
router.post('/send_message', checkAuth, MessageController.sendMessage);
router.get('/student/:id', checkAuth, MessageController.getMessageWindowsForStudent);
router.get('/company/:id', checkAuth, MessageController.getMessageWindowsForCompany);
router.post('/converstion_window',checkAuth,MessageController.converstionWindow);
module.exports = router;