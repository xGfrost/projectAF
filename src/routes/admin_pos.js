const express = require('express');

const admin_posController = require('../controller/admin_pos');

const router = express.Router();

router.get('/', admin_posController.getadminpos);

router.get('/:id', admin_posController.getbyid);

router.post('/',admin_posController.createNew);

router.post('/update/:id',admin_posController.update);

router.post('/delete/:id',admin_posController.deleteid);

module.exports = router;