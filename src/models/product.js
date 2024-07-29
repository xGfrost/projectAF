const dbPool = require('../config/database');

const getAllProducts = () => {
    return dbPool.execute(`SELECT * FROM products`);
}

const searchProduct = (keyword) => {
    const searchTerm = `%${keyword}%`
    return dbPool.execute(`SELECT * FROM products WHERE name LIKE ?`, [searchTerm]);
}

const getProduct = (productId) => {
    return dbPool.execute(`SELECT * FROM products WHERE id = ?`, [productId]);
}

const addProduct = (body) => {
    const {id, name, price, description, image} = body;
    return dbPool.execute(`INSERT INTO products (id, name, price, description, image) VALUES (?, ?, ?, ?, ?)`,
        [id, name, price, description, image]);
}

const updateProduct = (body, productId) => {
    const {name, price, description, image} = body;
    const result = dbPool.execute(`UPDATE products SET name = ?, price = ?, description = ?, image = ? WHERE id = ?`,
        [name, price, description, image, productId]);
    if (result.affectedRows == 0) return [];
    return getProduct(productId); 
}

const deleteProduct = (productId) => {
    return dbPool.execute(`DELETE FROM product WHERE id = ?`, [productId]);
}

module.exports = {
    getAllProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}