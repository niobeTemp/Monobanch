const callout_sanitation_scheduleController = require('../controllers/calloutSanitationScheduleController');
const express = require('express');
const router = express.Router();

router.get('/callout_sanitation_schedule', callout_sanitation_scheduleController.C_S_S_get);
router.post('/callout_sanitation_schedule', callout_sanitation_scheduleController.D_C_S_S_post);
router.get('/daily_schedule_list', callout_sanitation_scheduleController.D_C_S_S_list_get);
module.exports = router;