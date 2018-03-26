var express = require('express');
var router = express.Router();
var controller = require('../controllers/main-controller');

/* GET home page. */
router.get('/', controller.index_get);

router.get('/picture', controller.picture_get);

router.post('/', controller.picture_post);

module.exports = router;
