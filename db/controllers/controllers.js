const  {selectAllTopics, selectArticleById, selectAllArticles,selectCommentById,addCommentToArticle}  = require("../models/models")


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
    const { article_id } = req.params
    
    selectArticleById(article_id).then((article)=>{
        if(!article){
            return res.status(404).send({ msg: 'Article not found' })

        }
    })
    selectCommentsByArticleId(article_id)
                .then((comments) => {
                    if (comments.length === 0) {
                        return res.status(200).send({ msg: 'No comments found for this article' })}

                    res.status(200).send({ comments });
                })
            }
    
    


 exports.postCommentToArticle = (req, res) => {
    console.log(req.body)
   const { article_id } = req.params
    const { username, body } = req.body
    
    addCommentToArticle(article_id, username, body).then((comment)=>{
        console.log(comment, "controller")
        return res.status(200).send({comment})
    }).catch((error)=>{
        console.log(error)
    })

 }