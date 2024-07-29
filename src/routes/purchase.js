const {Router} = require('express');
const route = Router();
const purchaseController = require('../controller/purchase')

route.get('/all', purchaseController.getAllPurchase);
route.post('/', purchaseController.savePurchase);
route.post('/update/:purchaseId', purchaseController.updatePurchaseStatus);

module.exports = route;