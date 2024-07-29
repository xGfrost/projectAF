const productModel = require('../models/product');
const cuid = require('cuid');

const getAllProducts = async (req, res) => {
    try {
        const [result] = await productModel.getAllProducts();
        return res.status(200).json({message: 'Products successfully retreived', data: result}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const searchProduct = async (req, res) => {
    const searchKeyword = req.query?.search;

    if (!searchKeyword) return res.status(400).json({message: "No query params!"});

    try {
        const [result] = await productModel.searchProduct(searchKeyword);
        return res.status(200).json({message: 'Product(s) successfully retreived', data: result}); 
        } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const getProduct = async (req, res) => {
    const productId = req.params.productId;

    if (!productId) return res.status(400).json({message: "No product id!"});

    try {
        const [result] = await productModel.getProduct(productId);
        return res.status(200).json({message: 'Product successfully retreived', data: result}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const updateProduct = async (req, res) => {
    const {body} = req;
    const image = req.file.filename;
    const productId = req.params.productId;

    if (Object.keys(body).length == 0) return res.status(400).json({message: "No product data to update!"});
    if (!image) return res.status(400).json({message: "No product image!"});
    if (!productId) return res.status(400).json({message: "No product id!"});

    try {
        body.image = image;
        await productModel.updateProduct(body, productId)
        return res.status(200).json({message: 'Product successfully updated', data: body}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const addProduct = async (req, res) => {
    const {body} = req;
    const image = req.file.filename;
    const productId = req.params?.productId;

    if (Object.keys(body).length == 0) return res.status(400).json({message: "No product data to add!"});
    if (!image) return res.status(400).json({message: "No product image!"});
    if (!productId) return res.status(400).json({message: "No product id!"});

    try {
        body.id = cuid();
        body.image = image;

        await productModel.addProduct(body)
        return res.status(201).json({message: 'Product successfully added', data: body}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params?.productId;
    if (!productId) return res.status(400).json({message: "No product id!"});
    try {
        await productModel.deleteProduct(productId);
        return res.status(200).json({message: 'Product successfully removed', data: []}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

module.exports = {
    getAllProducts,
    getProduct,
    deleteProduct,
    addProduct,
    updateProduct,
    searchProduct
}