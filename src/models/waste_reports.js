const dbPool = require('../config/database');
const cuid = require('cuid');

const createNew = (body, image) => {
    const id = cuid();
    const SQLQuery = `INSERT INTO waste_reports (id, user_id, description, image, location, point, coin, status)
                        VALUES(?,?,?,?,?,?,?,?)`;

                        return dbPool.execute(SQLQuery,[id, body.user_id,body.description,image,body.location,body.point,body.coin,body.status]);
}

const deleteid = (id) => {
    const SQLQuery = `DELETE FROM waste_reports WHERE id = ?`
    return dbPool.execute(SQLQuery, [id]);
}

const update =  async (body, id) => {
    let SQLQuery = `UPDATE waste_reports
                    SET status = ?
                    WHERE id = ? `;

                    await dbPool.execute(SQLQuery, [body.status, id]);

    const wastereportsQuery = `SELECT * FROM waste_reports WHERE id = ?`;
    const [rows] = await dbPool.execute(wastereportsQuery, [id]);

    if(rows.length > 0){
        const userId = rows[0].user_id;
        const point = rows[0].point;
        const coin = rows[0].coin;

        if (body.status === "accepted"){
            const userQuery = `UPDATE users
                                SET  point = point + ?, coin = coin + ?
                                WHERE id = ?`;

            const userValues = [point, coin ,userId];

            await dbPool.execute(userQuery, userValues);
        }
    }else{
        throw new Error(`No user_id found for waste_reports id ${id}`);
    }
}

const getall = () => {
    const SQLQuery =`SELECT
                      waste_reports.id AS wrid, 
                      waste_reports.user_id,  
                      waste_reports.description,  
                      waste_reports.image,  
                      waste_reports.location,  
                      waste_reports.point,  
                      waste_reports.coin,  
                      waste_reports.status,  
                      waste_reports.created_at, 
                      waste_reports.updated_at,
                      users.id AS userid,
                        users.name,
                        users.email,
                        users.photo_url
                         FROM 
                         waste_reports
                         LEFT JOIN
                         users
                         ON
                         waste_reports.id = users.id  
                    `;
                    return dbPool.execute(SQLQuery);
}

const getallsearch = (search) => {
    const SQLQuery = `SELECT
                      waste_reports.id AS wrid,  
                      waste_reports.user_id,  
                      waste_reports.description,  
                      waste_reports.image,  
                      waste_reports.location,  
                      waste_reports.point,  
                      waste_reports.coin,  
                      waste_reports.status,  
                      waste_reports.created_at,  
                      waste_reports.updated_at,
                      users.id AS userid,
                        users.name,
                        users.email,
                        users.photo_url
                         FROM 
                         waste_reports
                         LEFT JOIN
                         users
                         ON
                         waste_reports.id = users.id
                         WHERE
                         waste_reports.location
                         LIKE 
                         ?  
                    `;
    const searchParam = `%${search}%`;
    return dbPool.execute(SQLQuery, [searchParam])
    // eslint-disable-next-line no-unused-vars
    .then(([results, _]) => results);
}

const getbyid = (id) => {
    const SQLQuery = `SELECT
                      waste_reports.id AS wrid,  
                      waste_reports.user_id,  
                      waste_reports.description,  
                      waste_reports.image,  
                      waste_reports.location,  
                      waste_reports.point,  
                      waste_reports.coin,  
                      waste_reports.status,  
                      waste_reports.created_at,  
                      waste_reports.updated_at,
                      users.id AS userid,
                        users.name,
                        users.email,
                        users.photo_url
                         FROM 
                         waste_reports
                         LEFT JOIN
                         users
                         ON
                         waste_reports.id = users.id
                         WHERE
                         waste_reports.id = ?  
                    `;
                    return dbPool.execute(SQLQuery, [id]);
}

module.exports = {
    createNew,
    deleteid,
    update,
    getall,
    getallsearch,
    getbyid

}