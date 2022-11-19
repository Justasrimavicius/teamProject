var express = require('express');
var router = express.Router();

/* GET users listing. */

// http handlers from userController
const authController = require('../controllers/authController');
const scrappingController = require('../controllers/scrappingController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/redditScrapping', scrappingController.redditScrapping);
router.post('/twitterScrapping', scrappingController.twitterScrapping);

module.exports = router;
