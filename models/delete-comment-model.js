const db = require ('../db/connection')

function deleteCommentsById (comment_id){
    return db
    .query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
    .then((result)=>{
        if (result.rows.length === 0) {
            return null; 
        }
        return result.rows[0]
     

          })
    }



module.exports = {deleteCommentsById}