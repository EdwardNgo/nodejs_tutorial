//HOME, SEARCH, CONTACT
const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/home', siteController.index);

module.exports = router;
