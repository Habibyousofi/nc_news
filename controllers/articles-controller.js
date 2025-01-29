const {selectAllArticles} = require ('../models/articles_model')

function getAllArticles (req, res, next){
    selectAllArticles()
    .then((articles)=>{
        res.status(200).send(({articles}))
    })
    .catch((err)=>{
        next(err)
    })
}

module.exports = {getAllArticles}