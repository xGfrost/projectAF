const waste_reportsModel = require('../models/waste_reports');

const createNew = async(req, res)=>{
    const {body, file} =req;
    const image =file.filename;

    try {
        await waste_reportsModel.createNew(body, image);
        res.status(201).json({
            message:'Success',
            data:body
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:body
        });
    }
}

const update = async(req, res)=>{
    const {id} = req.params;
    const{body} = req;
    try {
        await waste_reportsModel.update(body,id);
        res.status(200).json({
            message:'Success'
        })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data:[]
        });
    }
}

const deleteid = async (req, res)=> {
    const {id} = req.params;
    try {
        await waste_reportsModel.deleteid(id)
        res.status(200).json({
            message: 'Success',
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data: null
        });
    }
}

const getwastereports = async(req, res) => {
    const {search} = req.query;
    try {
        if(search){
            const rows = await waste_reportsModel.getallsearch(search);
            const formattedResults = rows.map(item => ({
                id:item.wrID,
                user_id:item.user_id,
                description:item.description,
                image:item.image  ,
                location:item.location,
                point:item.point,
                coin:item.coin,
                status:item.status,
                created_at:item.created_at,
                updated_at:item.updated_at,

                user : {
                    id:item.userid,
                    name:item.name,
                    email:item.email,
                    photo_url:item.photo_url,
                }
            }));
            res.status(200).json({
                message: 'Success',
                data: formattedResults,
            })
        }else{
            const [data] = await waste_reportsModel.getall();
            const formattedResults = data.map(item => ({
                id:item.wrID,
                user_id:item.user_id,
                description:item.description,
                image:item.image  ,
                location:item.location,
                point:item.point,
                coin:item.coin,
                status:item.status,
                created_at:item.created_at,
                updated_at:item.updated_at,

                user : {
                    id:item.userid,
                    name:item.name,
                    email:item.email,
                    photo_url:item.photo_url,
                }
            }));
            res.status(200).json({
                message: 'Success',
                data: formattedResults,
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data: null
        });
    }
}

const getbyid = async(req,res) =>{
    const {id} = req.params;
    try {
        const [data] = await waste_reportsModel.getbyid(id);
            const formattedResults = data.map(item => ({
                id:item.wrID,
                user_id:item.user_id,
                description:item.description,
                image:item.image  ,
                location:item.location,
                point:item.point,
                coin:item.coin,
                status:item.status,
                created_at:item.created_at,
                updated_at:item.updated_at,

                user : {
                    id:item.userid,
                    name:item.name,
                    email:item.email,
                    photo_url:item.photo_url,
                }
            }));
            res.status(200).json({
                message: 'Success',
                data: formattedResults,
            })
    } catch (error) {
        res.status(400).json({
            message: error.message,
            data: null
        });
    }
}

module.exports = {
    createNew,
    update,
    deleteid,
    getwastereports,
    getbyid,

}