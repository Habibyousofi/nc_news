const {selectArticlesById} = require("./../models/article_id_model")

function getArticlesbyId(req, res , next){
    const {article_id} = req.params
   
    selectArticlesById(article_id)
    .then((article)=>{
        res.status(200).send({article})
    })
    .catch((err)=>{
        if (err.status){
            res.status(err.status).send({error:"Article not found"})
        }
        else {
        next(err)
        }
    })

}


module.exports = {getArticlesbyId}