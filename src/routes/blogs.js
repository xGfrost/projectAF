const express = require('express');

const blogsController = require('../controller/blogs');

const router = express.Router();

router.get('/:id', blogsController.getbyid);

module.exports = router;