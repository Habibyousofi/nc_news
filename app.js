const express = require ("express")
const endpoints = require ('./endpoints.json');
const { getAllTopics } = require("./nc_news_controller");
const app = express();

app.get('/api',(request , response)=>{
    response.status(200).send({endpoints})
    
})
app.get('/api/topics' , getAllTopics)

app.all("*",(req , res)=>{
res.status(404).send({error: "endpoint not found"})
})



module.exports = app