const express = require('express');
const app = express();
const { getAllTopics, getArticleById, getAllArticles, getCommentsById } = require('./db/controllers/controllers')
const endpoints = require('./db/endpoints.json')



app.get('/api/topics',getAllTopics)
app.get('/api', (req, res) =>{
    res.status(200).send(endpoints)
})
app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments' , getCommentsById)




module.exports = app 