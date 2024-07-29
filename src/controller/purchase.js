const purchaseModel = require('../models/purchase');
const cuid = require('cuid');
const {cratePurchaseObject, createProductObject, createUserObject} = require('../util/util');


const getAllPurchase = async (req, res) => {
    try {
        const [result] = await purchaseModel.getAllPurchase();
        const allPurchases = result.map((purchase) => {
            return {
                ...cratePurchaseObject(purchase),
                product: createProductObject(purchase),
                user: createUserObject(createUserObject)
            }
        })
        return res.status(200).json({message: 'All purchase successfully retreived', data: allPurchases}); 
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}
const savePurchase = async (req, res) => {
    const {body} = req;
    if (Object.keys(body).length == 0) return res.status(400).json({message: "No purchase data to add!"});
    try {
        body.id = cuid();
        await purchaseModel.savePurchase(body);
        return res.status(201).json({message: 'Purchase successfully added!', data: body});
    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}
const updatePurchaseStatus = async (req, res) => {
    try {
        const status = req.body?.status;
        const purchaseId = req.params.purchaseId;
    
        if (status) return res.status(400).json({message: "No status data to update!"});
        if (!purchaseId) return res.status(400).json({message: "No purchase id!"});

        const result = await purchaseModel.updatePurchaseStatus(purchaseId);
        if (result.length == 0) return res.status(400).json({message: 'No purchase row affected. Perhaps the purchase id is wrong?'});
        return res.status(201).json({message: 'Purchase status successfully updated'});

    } catch (error) {
        res.status(500).json({
            message: error.message,
            data:[]
        });
    }
}

module.exports = {
    getAllPurchase,
    savePurchase,
    updatePurchaseStatus
}