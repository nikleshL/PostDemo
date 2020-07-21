let express = require('express');
let router = express.Router();
let indexController = require("../controller/indexController");

router.get('/healthcheck', indexController.healthCheck);
router.get('/toppostlist', indexController.getTopPostList);
router.post('/searchcomment', indexController.searchComment);

module.exports = router;