const {getAllUsers} = require('../models/api_users_model')

function getUsers(req , res, next){
    getAllUsers()
    .then((users)=>{
        console.log(users);
        
        res.status(200).send({users})
    })
    .catch((err)=>{
        next(err)
    })


}

module.exports= {getUsers}