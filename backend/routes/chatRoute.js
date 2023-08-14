const express = require('express')
const app = express()
const router = express.Router();
const chatController = require('../controllers/chatController');
const util = require('../utils/util')

router.post('/:id', [util.authorize_json], chatController.sendMessage);

router.get('/:id', [util.authorize_json], chatController.getMessage);

router.get('/', [util.authorize_json], chatController.getAllMessage);

module.exports = router;

