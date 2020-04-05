var express = require('express');
var router = express.Router();
let EventsController = require('./../controllers/eventsController');
let checkAuth = require('./../config/passport').checkAuth;

router.get('/show/:id',checkAuth, EventsController.show_event);
router.get('/student/:studentProfileId',checkAuth, EventsController.show_all_events_for_student);
router.get('/company/:companyProfileId',checkAuth, EventsController.show_all_events_for_company);
router.post('/',checkAuth, EventsController.create_event);

module.exports = router;