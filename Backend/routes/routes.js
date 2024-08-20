const express = require('express')
// const promptController = require('../controllers/prompt-controller')
const routes = express.Router()

const { sendText, getChatHistory } = require('../controllers/prompt-controller');
routes.post('/api/prompt', sendText);
routes.get('/api/gethistory/:userid', getChatHistory)

module.exports = routes;