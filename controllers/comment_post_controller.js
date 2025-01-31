const {postCommentById} = require("../models/comment_post_model")

const postComment = (req, res, next) => {
    const {article_id} = req.params
    const{username , body} = req.body

    postCommentById(article_id, username, body)
    .then((comment)=>{

        res.status(201).send({comment})
    })
    .catch ((err)=>{
        next(err)
    })

}

module.exports = {postComment}