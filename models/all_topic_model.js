const db = require("../db/connection")

function selectAllTopics(){
    return db
    .query("SELECT slug, description FROM topics;")
    .then((result)=>{
        console.log(result.rows, "result")
        return result.rows
    }).catch((err)=>{
        console.log(err, "There is a problem with the query")
    })

}



module.exports = {selectAllTopics};