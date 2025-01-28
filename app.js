const express = require ("express")
const endpoints = require ('./endpoints.json')
const { getAllTopics } = require("./controllers/all_topic_controller.js");
const {getArticlesbyId} = require ('./controllers/article_id_controller.js')
const app = express();

app.get('/api',(request , response)=>{
    response.status(200).send({endpoints})
    
})
app.get('/api/topics' , getAllTopics)

app.get('/api/articles/:article_id', getArticlesbyId)

app.all("*",(req , res)=>{
res.status(404).send({error: "endpoint not found"})
})


app.use((err , req, res, next) => {
    console.log(err);
    if(err.status) {
        res.status(404).send({error: "Article not found"})}
        else {
        res.status(400).send({error: "incorrect Article ID"})}
})

module.exports = app