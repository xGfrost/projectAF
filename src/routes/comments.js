const express = require('express');

const commentsController = require('../controller/comments');

const router = express.Router();

router.post('/',commentsController.createNew);

module.exports = router;