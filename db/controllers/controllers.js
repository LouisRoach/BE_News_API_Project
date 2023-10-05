const  {selectAllTopics, selectArticleById, selectAllArticles,selectCommentById}  = require("../models/models")


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
    selectCommentById(article_id).then((comment)=>{
      
        if(!comment){
            console.log(comment, "controller")
            return res.status(404).send({msg: '404 not found'})
        }

        
        
     

        res.status(200).send({comment})
    })
 }


 exports.postCommentToArticle = (req, res) => {
    const {article_id} = req.params
    addCommentToArticle(article_id).then((comment)=>{
        return res.status(200).send({comment})
    })

 }