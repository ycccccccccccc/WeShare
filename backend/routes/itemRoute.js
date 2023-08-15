const express = require('express');
const multer = require('multer');
const router = express.Router();
const util = require('../utils/util');
const itemController = require('../controllers/itemController');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
    }
})

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1 * 1024 * 1024 // 1MB
    }
  });

router.post('/items', [util.authorize_json, util.authorize_bearer], itemController.addItem);
router.get('/items', [util.authorize_json, util.authorize_bearer], itemController.getItems);
router.get('/items/:id', [util.authorize_json, util.authorize_bearer], itemController.getItems);
router.put('/items/:id', [util.authorize_json, util.authorize_bearer], itemController.addBuyer);
router.put('/items/:id', [util.authorize_json, util.authorize_bearer], itemController.updateItem);
router.put('/items/:id/photo', upload.single('picture'), [util.authorize_multipart, util.authorize_bearer], itemController.updateItemPhoto);

module.exports = router;

