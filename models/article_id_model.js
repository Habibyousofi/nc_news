const db = require("../db/connection.js")

selectArticlesById = (article_id)=>{
    return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((response)=>{
        if(response.rows.length === 0){
            return Promise.reject({status: 404, error: "Article not found"})
        }
        return response.rows[0]

    })
}
   
module.exports = {selectArticlesById}

