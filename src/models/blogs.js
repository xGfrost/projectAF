const dbPool = require('../config/database');
const cuid = require('cuid');

const getbyid = async(id) => {
    const SQLQuery = `SELECT
                        blogs.id AS blogID, 
                        blogs.title, 
                        blogs.description AS description ,
                        blogs.image AS image, 
                        blogs.status AS status, 
                        blogs.type AS type, 
                        blogs.video_url AS video_url,
                        comments.id AS commentID, 
                        comments.user_id AS user_id, 
                        comments.blog_id AS blog_id, 
                        comments.content AS content,
                        users.id AS userID, 
                        users.name AS name,
                        users.email AS email, 
                        users.photo_url AS photo_url
                        FROM
                            blogs
                            LEFT JOIN 
                                comments
                                ON
                                blogs.id = comments.blog_id
                                LEFT JOIN
                                users
                                ON
                                comments.user_id = users.id
                                WHERE 
                                blogs.id = ?
                                 `;
                                 const [rows] = await dbPool.execute(SQLQuery, [id]);
                                 return rows;
}

module.exports ={
    getbyid,
}