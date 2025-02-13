const db = require("../db/connection")

function getAllUsers(){
    return db
    .query(`SELECT username, name, avatar_url FROM users;`)
    .then((result)=>{
        console.log(result)
        return result.rows
    
    })


}

module.exports = {getAllUsers}