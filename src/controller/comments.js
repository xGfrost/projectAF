const commentsModel = require('../models/comments');

const createNew = async(req, res) => {
    const {body} =req;
    try {
        await commentsModel.createNew(body);
    res.status(201).json({
        message:'Success',
        data: body,
    })
    } catch (error) {
        res.status(400).json({
            message:error.message,
            data: body,
        })
    }
}

module.exports ={
    createNew,
}