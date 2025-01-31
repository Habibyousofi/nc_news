const topics = require('../db/data/development-data/topics')
const {selectAllTopics} = require("../models/all_topic_model")

function getAllTopics (request , response, next) {
    selectAllTopics()
    .then((topics)=>{
        response.status(200).send({topics})
    }).catch((err)=>{
        next()
    })

}
module.exports = {getAllTopics}