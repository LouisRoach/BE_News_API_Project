const express = require('express');
const app = express();
const { getAllTopics } = require('./db/controllers/topics_controller')


app.get('/api/topics',getAllTopics)



module.exports = app 