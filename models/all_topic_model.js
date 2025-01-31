const db = require("../db/connection")

function selectAllTopics(){
    return db
    .query("SELECT slug, description FROM topics;")
    .then((result)=>{
        return result.rows
    }).catch((err)=>{
        next()

    })
}



module.exports = {selectAllTopics};