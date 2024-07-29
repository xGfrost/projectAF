const express = require('express');

const educationsController = require('../controller/educations');

const router = express.Router();

router.get('/',educationsController.getEducation);

router.get('/:id', educationsController.getbyid);

router.post('/update/:id', educationsController.update);

router.post('/delete/:id',educationsController.deleteid );

router.post('/',educationsController.createNew);



module.exports = router;