const express = require ("express")
const endpoints = require ('./endpoints.json')
const app = express();

app.get('/api',(request , response)=>{
    console.log(endpoints)
    response.status(200).send({endpoints})

})

module.exports = app