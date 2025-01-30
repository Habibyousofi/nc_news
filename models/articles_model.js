const db = require('../db/connection')

const selectAllArticles = ()=>{

    return db.query
    (`SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.votes, articles.created_at, articles.article_img_url,
    COUNT (comments.comment_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`)

    .then(({rows})=>{
        return rows
    })

}

module.exports = {selectAllArticles}