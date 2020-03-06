var express = require('express');
var router = express.Router();
let EventsController = require('./../controllers/eventsController');

router.get('/show/:id',EventsController.show_event);
router.get('/student/:studentProfileId',EventsController.show_all_events_for_student);
router.get('/company/:companyProfileId',EventsController.show_all_events_for_company);
router.post('/',EventsController.create_event);

module.exports = router;