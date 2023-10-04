const db = require('../connection')


exports.selectAllTopics = () => {
    return db.query(`SELECT * FROM topics;`).then((result) =>{
       
        return result.rows
    })
}

exports.selectArticleById = (article_id) => {
    return db.query('SELECT * FROM articles WHERE article_id = $1', [article_id])
    .then((result)=>{
        if(!result.rows[0]){
            return null
        }
        return result.rows[0]
    })
}

exports.selectAllArticles = () => {
    return db.query('SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC;')
    .then((result)=>{
        if(!result.rows){
            return null}
            return result.rows
    })
}

exports.selectCommentById = (article_id) =>{
    return db.query('SELECT * FROM comments WHERE article_id = $1' , [article_id])
        .then((result)=>{
            if(result.rows.length === 0){
                return null}
                return result.rows
            

        })

}