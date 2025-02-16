const express = require('express');
const {getUsers, sendMessage, getMessages} = require('../controlers/message.controler');
const authorizedCheck = require('../middleware/authorizedCheck');

const router = express();

router.get('/users',authorizedCheck, getUsers);
router.post('/send/:id',authorizedCheck, sendMessage);
router.post('/all/:id',authorizedCheck, getMessages);

module.exports = router;