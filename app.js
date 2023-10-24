const cors = require('cors');

const express = require('express');
const app = express();
const { getAllTopics, getArticleById, getAllArticles, getCommentsById, postCommentToArticle, patchController, commentDeleteController } = require('./db/controllers/controllers')
const endpoints = require('./db/endpoints.json')
const users = require('./db/data/test-data/users')
const comments = require('./db/data/development-data/comments')



app.use(cors());
app.use(express.json())

app.get('/api/topics',getAllTopics)
app.get('/api', (req, res) =>{
    res.status(200).send(endpoints)
})
app.get('/api/articles/:article_id', getArticleById)

app.get('/api/articles', getAllArticles)

app.get('/api/articles/:article_id/comments', getCommentsById)

app.post('/api/articles/:article_id/comments', postCommentToArticle)

app.get('/api/users', (req,res) =>{
    res.status(200).send(users)
})

app.get('api/comments', (req,res) =>{
res.status(200).send(comments)
})


app.patch('/api/articles/:article_id', patchController)


app.delete('api/comments/:comment_id', commentDeleteController)





module.exports = app 