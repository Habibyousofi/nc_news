const express = require ("express")
const endpoints = require ('./endpoints.json')
const { getAllTopics } = require("./controllers/all_topic_controller.js");
const {getArticlesbyId} = require ('./controllers/article_id_controller.js');
const { getAllArticles } = require("./controllers/articles-controller.js");
const {getArticlesByComment} = require("./controllers/articles_comment_controller.js")
const app = express();
app.use(express.json())

app.get('/api',(request , response)=>{
    response.status(200).send({endpoints})
    
})
app.get('/api/topics' , getAllTopics)

app.get('/api/articles/:article_id', getArticlesbyId)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getArticlesByComment)

app.all("*",(req , res)=>{
res.status(404).send({error: "endpoint not found"})
})

// app.use((err, req, res, next) => {
//   console.log(err,"<<<<");
//   if (err.status === 404){
//   res.status(404).send({ error: "Article not found"})
//   } else {
//     next(err)
//   }
// })

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({error: "Incorrect Article ID"})
  } else if (err.status) {
    res.status(404).send({error: "Article not found"})
  } else {
    res.status(500).send({error: "Internal Server Error"})
  }
});


// app.use((err, req, res, next) => {
//     if (err.status) {
//       res.status(err.status).send({ message: err.message });
//     } else next(err);
//   });





module.exports = app