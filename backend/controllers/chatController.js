const chatModel = require('../models/chatModel')

module.exports = {
    getMessage: async (req, res) => {
        const { my_ID } = req.user.id
        const { seller_ID } = req.params.id;
        const result = await chatModel.getMessage(my_ID, seller_ID);
        return res.status(200).json({ data: result }); 
    },
    getMessagePreview: async (req, res) => {
        const { my_ID } = req.user.id
        const result = await chatModel.getMessagePreview(my_ID);
        return res.status(200).json({ data: result }); 
    },
    sendMessage: async (req, res) => {
        const { my_ID } = req.user.id
        const { seller_ID } = req.params.id
        const { message } = req.body
        const result = await chatModel.sendMessage(my_ID,seller_ID,message)
        return res.status(200).json({ data: result })
    },
}
