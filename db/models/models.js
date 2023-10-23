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
             
            return result.rows
        
        })
        .catch((error) => {
            
            throw error;
          });
      };



exports.addCommentToArticle = (article_id, username, body) =>{
    console.log('model')
    return db.query('INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3) RETURNING *;', [article_id, username, body]).then((comment)=>{
        console.log(comment, "model")
        return comment.rows[0]
    })
}


exports.patchModel = (article_id, inc_votes) =>{
    return db.query(
        'UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;',
        [inc_votes, article_id]
    )
    .then((article)=>{
        return article.rows[0]
    })
}


exports.commentDeleteController = (req, res) => {

    const { comment_id } = req.params;
  
    commentDeleteModel(comment_id)
  
      .then((deleted) => {
  
        if(deleted) {
          console.log('Comment deleted successfully');
          return res.status(204).send();
        } 
        
        console.log('Comment not found');
        res.status(404).json({ msg: 'Comment not found' });
  
      })
      .catch((err) => {
        console.error('Error deleting comment:', err);
        res.status(500).json({ msg: 'Internal server error' });
      });
  
  }




/*exports.commentDeleteModel = (comment_id) => {
    return db.query('DELETE FROM comments WHERE comment_id = $1 RETURNING *;', [comment_id])
        .then((result) => {
            console.log(result)
            return true;
        })
        .catch((error) => {
            console.error(error);
            throw error;
        });
}*/