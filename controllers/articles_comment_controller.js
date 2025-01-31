const {selectArticleByComment} = require("../models/articles_comment_model")

const getArticlesByComment = (req, res, next) => {
    const {article_id} = req.params;

    selectArticleByComment(article_id)
    .then((comments)=>{
        res.status(200).send({comments})
    }).catch((err)=>{

        next(err)
        })

}

module.exports = {getArticlesByComment}