const userModel = require('../models/user');
const {cratePurchaseObject, createProductObject} = require('../util/util');

const getUserPurchase = async (req, res) => {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({message: "No user id!"});
    try {
        const [result] = await userModel.getUserPurchase();
        const allUserPurchase = result.map((purchase) => {
            return {
                ...cratePurchaseObject(purchase),
                product: createProductObject(purchase)
            }
        })
        return res.status(200).json({message: 'User purchase successfully retreived', data: allUserPurchase}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

module.exports = {
    getUserPurchase
}