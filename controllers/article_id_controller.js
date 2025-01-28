const {selectArticlesById} = require("../models/article_id_model")

function getArticlesbyId(){
    selectArticlesById()
    

}


module.exports = {getArticlesbyId}