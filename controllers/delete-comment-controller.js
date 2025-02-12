const {deleteCommentsById} = require('../models/delete-comment-model')

function deleteComments(req, res, next){
    const {comment_id} = req.params

    deleteCommentsById(comment_id)
    .then((result) => {
        if (result === null) {
          return res.status(404).send({});
        }
        return res.status(204).send("No Content");
    }). catch((err)=>{
        next(err)
    })

}

module.exports = {deleteComments}