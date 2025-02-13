const db = require("../db/connection")


patchArticleById = (article_id, inc_votes) =>{
    return db
    .query(`UPDATE articles 
        SET votes = votes + $1 
        WHERE article_id = $2
        RETURNING*;`, [inc_votes, article_id])
    .then(({rows})=>{
        if (rows.length === 0) {
            return Promise.reject({ status: 404, error: "Article not found"}) }
     {
        return rows[0]
          }

        })
    }



module.exports = {patchArticleById}