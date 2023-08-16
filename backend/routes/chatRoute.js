const express = require('express')
const router = express.Router();
const chatController = require('../controllers/chatController');
const util = require('../utils/util')

router.post('/:id', [util.authorize_json,util.authorize_bearer], chatController.sendMessage);

router.get('/:id', [util.authorize_bearer], chatController.getMessage);

router.get('/', [util.authorize_bearer], chatController.getMessagePreview);

module.exports = router;

