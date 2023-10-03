const express = require('express');
const app = express();
const { getAllTopics, getEndpoints } = require('./db/controllers/controllers')
const endpoints = require('./db/endpoints.json')



app.get('/api/topics',getAllTopics)
app.get('/api', (req, res) =>{
    res.status(200).send(endpoints)
})





module.exports = app 