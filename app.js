const express = require ("express")
const endpoints = require ('./endpoints.json')
const { getAllTopics } = require("./controllers/all_topic_controller.js");
const {getArticlesbyId} = require ('./controllers/article_id_controller.js');
const { getAllArticles } = require("./controllers/articles-controller.js");
const {getArticlesByComment} = require("./controllers/articles_comment_controller.js")
const {postComment} = require("./controllers/comment_post_controller.js")
const {getUpdatedArticle} = require("./controllers/patch-article-controller.js");
const { deleteComments } = require("./controllers/delete-comment-controller.js");
const app = express();
app.use(express.json())

app.get('/api',(request , response)=>{
    response.status(200).send({endpoints})
    
})
app.get('/api/topics' , getAllTopics)

app.get('/api/articles/:article_id', getArticlesbyId)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getArticlesByComment)

app.post('/api/articles/:article_id/comments', postComment)

app.patch('/api/articles/:article_id', getUpdatedArticle)

app.delete('/api/comments/:comment_id', deleteComments)

app.all("*",(req , res)=>{
res.status(404).send({error: "endpoint not found"})
})

app.use((err, req, res, next) =>{
  console.log(err);
  

  if (err.code === "23502") {
    res.status(400).send({error: "Missing required fields"})
  } else if (err.code === "23503" || err.code === "undefined") { 
    return res.status(404).send({ error: "Article not found" }) }
    else {
      next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({error: "Incorrect Article ID"})
  } else if (err.status) {
    res.status(404).send({error: "Article not found"})
  } else {
    res.status(500).send({error: "Internal Server Error"})
  }
});




module.exports = app