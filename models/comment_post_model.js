const db = require("../db/connection")

const postCommentById = (article_id, username, body) => {
    return db
    .query(`INSERT INTO comments (article_id , author, body) 
        VALUES  ($1, $2, $3) 
        RETURNING*;`, [article_id, username, body ])
        
        .then(({rows})=>{
            if (rows.length === 0) {
                return Promise.reject({ status: 400, error: "Missing required fields"})
            }
            return rows[0]
        
            })
      
        }


    

module.exports = {postCommentById}