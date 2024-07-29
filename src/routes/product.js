const {Router} = require('express');
const route = Router();
const productController = require('../controller/product');
const upload = require('../middleware/multer');

route.get('/', productController.getAllProducts);
route.get('/', productController.searchProduct);
route.get('/:productId', productController.getProduct);
route.post('/update/:productId', upload.single('image'), productController.updateProduct);
route.post('/', upload.single('image'), productController.addProduct);
route.delete('/:productId', productController.deleteProduct);

module.exports = route;