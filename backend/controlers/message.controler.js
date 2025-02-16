const Message = require('../models/message.model');
const User = require('../models/user.model');

const getUsers = async(req, res) => {
    userId = req.user._id
    try {
        const usersList = await User.find({_id: {$ne : userId}}).select("-password");
        return res.status(200).json(usersList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "not get user", success: false});
    }
}

const sendMessage = async(req, res) => {
    const reciverId = req.params.id
    const senderId = req.user._id;
    const image = req.body.image;
    const text = req.body.text;
    try {
        const message = await Message.create({
            reciverId,
            senderId,
            image,
            text
        })

        return res.status(200).json({message : "message sent", success : true});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "not send message", success: false});
    }
}

const getMessages = async(req, res) => {
    const reciverId = req.params.id;
    const senderId = req.user._id;
    try {
        const messages = await Message.find({
            $or : [
                {senderId : senderId , reciverId : reciverId},
                {senderId : reciverId , reciverId : senderId}
            ]
        })

        return res.status(200).json(messages)
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "not get message", success: false});
    }

}

module.exports = {getUsers, sendMessage, getMessages}