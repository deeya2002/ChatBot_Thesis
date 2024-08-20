const mongoose = require('mongoose');

const ChatHistorySchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    type: {
        type: String
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    userMsc: {
        type: String,
        required: true,
    }

});

const ChatHistory = mongoose.model('ChatHistory', ChatHistorySchema);

module.exports = ChatHistory;
