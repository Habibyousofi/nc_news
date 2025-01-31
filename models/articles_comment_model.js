const db = require('../db/connection')

selectArticleByComment = (article_id) => {
     return db
    .query(`SELECT * FROM articles WHERE article_id = $1;`, [article_id])
    .then(({rows})=>{
        if (rows.length === 0) {
            return Promise.reject({ status: 404, error: "Article not found" })
        }
       return rows
    })
 .then(()=>{ 
    return db
    .query(`SELECT  body, votes, author, article_id, created_at, comment_id 
    FROM comments WHERE article_id = $1
    ORDER BY created_at DESC`, [article_id])
})
.then(({rows})=>{ 
    return rows
})
}

    

module.exports = {selectArticleByComment}