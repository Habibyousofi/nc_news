const { articleData } = require("../db/data/test-data");
const {patchArticleById} = require ("../models/patch-article-model")

function getUpdatedArticle (req, res, next){
    const {article_id} = req.params;
    const {inc_votes} = req.body
    patchArticleById (article_id, inc_votes)
    .then((article)=>{
        if (!article) {
            return res.status(404).send("Article not found")
        }
        res.status(200).send({article})

    })
    .catch((err)=>{
        next (err)
    })

}


module.exports = {getUpdatedArticle}