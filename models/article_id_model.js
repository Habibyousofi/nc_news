const db = require("../db/connection.js")

selectArticlesById = (article_id)=>{
    if ((article_id)=== "NaN") {
        return Promise.reject({status: 400, message: "incorrect Article ID"})
}
    return db
    .query("SELECT * FROM articles WHERE article_id = $1;", [article_id])
    .then((response)=>{
        if(response.rows.length === 0){
            return Promise.reject({status: 404, message: "Article not found"})
        }
        return response.rows[0]

    })
   

}
module.exports = {selectArticlesById}

