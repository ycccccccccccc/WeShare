const express = require('express')
const app = express()
const router = express.Router();
const userController = require('../controllers/userController');
const util = require('../utils/util')

router.post('/signin', [util.authorize_json], userController.signin);
router.post('/signup', [util.authorize_json], userController.signup);

module.exports = router;

