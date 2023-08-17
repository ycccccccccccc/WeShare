const chatModel = require('../models/chatModel')

module.exports = {
    getMessage: async (req, res) => {
        const my_ID = req.user.id
        const seller_ID = req.params.id;
        const cursor = req.query.cursor;
        const decode_cursor = cursor === undefined ? 0 : Number(Buffer.from(cursor, 'base64').toString('ascii'))
        console.log("decode_cursor: ",decode_cursor)
        const result = await chatModel.getMessage(res,my_ID, seller_ID,decode_cursor);
        return res.status(200).json({ data: result }); 
    },
    getMessagePreview: async (req, res) => {
        const my_ID = req.user.id
        const cursor = req.query.cursor;
        const decode_cursor = cursor === undefined ? 0 : Number(Buffer.from(cursor, 'base64').toString('ascii'))
        console.log("decode_cursor: ",decode_cursor)
        const result = await chatModel.getMessagePreview(res,my_ID,decode_cursor);
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
