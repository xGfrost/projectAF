const dbPool = require('../config/database');

const getUserPurchase = (userId) => {
    const query = `SELECT b.*,
                        p.name as product_name,
                        p.id as product_id,
                        p.description,
                        p.price,
                        p.image,
                        p.updated_at as product_updated_at,
                        p.created_at as product_created_at
                    FROM user_buys b LEFT JOIN products p ON b.product_id = p.id
                    WHERE b.user_id = ?`
    return dbPool.execute(query, [userId]);
}

module.exports = {
    getUserPurchase
}