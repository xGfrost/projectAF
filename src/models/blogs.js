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

const getAll = () => {
    const SQLQuery = `SELECT * FROM blogs WHERE type = 'BLOG' `;

    return dbPool.execute(SQLQuery);
}

const getallsearch = (search) => {
    const SQLQuery = `SELECT * FROM blogs WHERE title LIKE ? AND type = 'BLOG'`;
    const searchParam = `%${search}%`;
    return dbPool.execute(SQLQuery, [searchParam])
    // eslint-disable-next-line no-unused-vars
    .then(([results, _]) => results);
}

const update = (id, body, image) => {
    const SQLQuery = `UPDATE blogs
                        SET title = ?, description = ?, image = ?, status = ?, video_url = ?
                            WHERE id = ?`;

    return dbPool.execute(SQLQuery, [body.title, body.description, image, body.status, body.video_url, id]);
}

const createNew = (body, image) => {
    const id = cuid();
    const SQLQuery = `INSERT INTO blogs (id, title, description, image, status, type, video_url)
                        VALUES (?,?,?,?,?,?,?)`;

                        return dbPool.execute(SQLQuery, [id, body.title,body.description,image,body.status,body.type,body.video_url]);
}

const deleteid = (id) => {
    const SQLQuery = `DELETE FROM blogs WHERE id = ?`;
    return dbPool.execute(SQLQuery, [id]);
}

module.exports ={
    getbyid,
    getallsearch,
    update,
    getAll,
    deleteid,
    createNew,

}