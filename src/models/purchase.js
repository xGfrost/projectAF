const dbPool = require('../config/database');

const getAllPurchase = () => {
    const query = `SELECT b.*,
                        p.name as product_name,
                        p.id as product_id,
                        p.description,
                        p.price,
                        p.image,
                        p.updated_at as product_updated_at,
                        p.created_at as product_created_at,
                        u.name as user_name,
                        u.email,
                        u.photo_url,
                        u.role,
                        u.created_at as user_created_at,
                        u.updated_at as user_updated_at
                    FROM user_buys b LEFT JOIN products p ON b.product_id = p.id
                    LEFT JOIN users u ON b.user_id = u.id;`
    return dbPool.execute(query);
}

const savePurchase = (body) => {
    const {id, product_id, status, user_id} = body;
    return dbPool.execute(`INSERT INTO user_buys (id, product_id, status, user_id) VALUES (?, ?, ?, ?)`,
        [id, product_id, status, user_id]);
}

const updatePurchaseStatus = async (purchaseId, status) => {
    const result = await dbPool.execute(`UPDATE products SET image = ? WHERE id = ?`,
        [status, purchaseId]);
    if (result.affectedRows == 0) return [];
}

module.exports = {
    savePurchase,
    updatePurchaseStatus,
    getAllPurchase
}