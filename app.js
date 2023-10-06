const express = require('express');
const app = express();
const { getAllTopics, getArticleById, getAllArticles, getCommentsById, postCommentToArticle, patchController } = require('./db/controllers/controllers')
const endpoints = require('./db/endpoints.json')
const users = require('./db/data/test-data/users')

app.use(express.json())

app.get('/api/topics',getAllTopics)
app.get('/api', (req, res) =>{
    res.status(200).send(endpoints)
})
app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments' , getCommentsById)

app.post('/api/articles/:article_id/comments' , postCommentToArticle)

app.get('/api/users', (req,res) =>{
    res.status(200).send(users)
})


app.patch('/api/articles/:article_id', patchController)




module.exports = app 