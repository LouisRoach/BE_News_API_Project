const  {selectAllTopics, selectArticleById, selectAllArticles,selectCommentById,addCommentToArticle,patchModel,commentDeleteModel}  = require("../models/models")


exports.getAllTopics = (req,res) => {
    
    selectAllTopics().then((topics)=> {
        res.status(200).send({topics})
    })
}

exports.getArticleById = (req, res) => {
    const { article_id } = req.params;
   
    selectArticleById(article_id).then((article) => {
        if(!article){
            return res.status(404).send({msg: '404 not found'})
        }
        
      res.status(200).send({article})
})
}

exports.getAllArticles = (req,res) => {
    selectAllArticles().then((articles)=>{
        res.status(200).send({articles})
    })
}

exports.getCommentsById = (req, res) => {
    const { article_id } = req.params;
  
    selectArticleById(article_id)
      .then((article) => {
        if (!article) {
          return res.status(404).send({ msg: 'Article not found' });
        }
  
        return selectCommentById(article_id)
          .then((comments) => {
            if (comments.length === 0) {
              return res.status(200).send({ msg: 'No comments found for this article' });
            }
  
            res.status(200).send({ comments });
          })
          .catch((error) => {
            res.status(500).send({ error: 'Internal Server Error' });
          });
      })
      .catch((error) => {
        res.status(500).send({ error: 'Internal Server Error' });
      });
  };
  


    
    


 exports.postCommentToArticle = (req, res) => {
    console.log(req.body)
   const { article_id } = req.params
   if(!req.body.username){
    return res.status(400).send({msg: 'Username not present'})
   }
   else 
   if(!req.body.body){
    return res.status(400).send({msg: 'Body not present'})

   }
    const { username, body } = req.body
    
    addCommentToArticle(article_id, username, body).then((comment)=>{
        console.log(comment, "controller")
        return res.status(200).send({comment})
    }).catch((error)=>{
        console.log(error)
    })

 }


 exports.patchController = (req,res) => {
    const {article_id} = req.params
    const { inc_votes } = req.body
    selectArticleById(article_id).then((article) => {
        if (!article){
            return res.status(400)
            .send({msg: 'invalid, article id not present'}) }

            else 
            if(isNaN(inc_votes)){
                return res.status(400)
                .send({msg: 'inc_votes is not a number'})
            }

            patchModel(article_id,inc_votes).then((result)=>{
                return res.status(200).send({result})
            })
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

 /*exports.commentDeleteController = (req, res) => {
    const { comment_id } = req.params;
    commentDeleteModel(comment_id)
        .then((result) => {
            if (result) {
                res.status(204).send();
            } else {
                res.status(404).json({ msg: 'comment not found' });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ msg: 'Internal Server Error' });
        });
}*/