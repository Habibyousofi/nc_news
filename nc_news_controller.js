const topics = require('./db/data/development-data/topics')
const {selectAllTopics} = require("./nc_news_model")

function getAllTopics (request , response, next) {
    selectAllTopics()
    .then((topics)=>{
        console.log(topics, "<---------")
        response.status(200).send({topics})
        // console.log("in controller <----- ")
    }).catch((err)=>{
        next(err)
    })

}
module.exports = {getAllTopics}