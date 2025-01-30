const {postCommentById} = require("../models/comment_post_model")

const postComment= (req, res, next) =>{

    postCommentById(article_id)

}

module.exports = {postComment}