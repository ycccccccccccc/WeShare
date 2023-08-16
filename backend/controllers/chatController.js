const chatModel = require('../models/chatModel')

module.exports = {
    getMessage: async (req, res) => {
        const my_ID = req.user.id
        const seller_ID = req.params.id;
        const result = await chatModel.getMessage(res,my_ID, seller_ID);
        return res.status(200).json({ data: result }); 
    },
    getMessagePreview: async (req, res) => {
        const my_ID = req.user.id
        const result = await chatModel.getMessagePreview(res,my_ID);
        return res.status(200).json({ data: result }); 
    },
    sendMessage: async (req, res) => {
        const sender_id = req.user.id
        const receiver_id = req.params.id
        const { message } = req.body
        const result = await chatModel.sendMessage(res,sender_id,receiver_id,message)
        return res.status(200).json({ data: result })
    },
}
