const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/dashboard', dashboardController.home);
router.post('/dashboard', dashboardController.home);
router.get('/callout_sanitation_schedule', dashboardController.C_S_S_get);
//router.post('/callout_sanitation_schedule', dashboardController.C_S_S_post);


module.exports = router;