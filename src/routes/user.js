const {Router} = require('express');
const route = Router();
const productController = require('../controller/user')

route.get('/:userId/histories', productController.getUserPurchase);

module.exports = route;