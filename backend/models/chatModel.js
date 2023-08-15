const bcrypt = require('bcrypt');
const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {

    getMessage: async ( my_ID, seller_ID ) => {
        try {
            const sql = `
            SELECT c.id, c.message, u.id AS user_id, u.name, u.image
            FROM chat AS c LEFT JOIN user AS u ON c.sender_id = u.id
            WHERE ( c.sender_id = ? AND c.receiver_id = ? ) OR ( c.sender_id = ? AND c.receiver_id = ? )
            `
            const [results] = await db.query(sql, [my_ID,seller_ID,seller_ID,my_ID])
            const msgList = results.map((result) => {
                const { id, message, user_id, name, image } = result
                return {
                    id: id,
                    message: message,
                    user: {
                        id: user_id,
                        name: name,
                        image: image
                    }
                };
            })
            const data = {
                chats: msgList
            }
            return data
        } catch (err) {
            return util.databaseError(err,'getMessage',res);
        }
    },

    getMessagePreview: async ( my_ID ) => {
        try {
            const sql = `
            SELECT 
                c.id, c.sender_id, c.receiver_id, c.message,
                u.id AS user_id, u.name, u.image
            FROM chat AS c
            LEFT JOIN user AS u ON c.sender_id = u.id
            WHERE c.sender_id = ? OR c.receiver_id = ?
            `
            const [results] = await db.query(sql, [my_ID,my_ID])
            const msgList = results.map((result) => {
                const { id, message, user_id, name, image } = result
                return {
                    id: id,
                    message: message,
                    user: {
                        id: user_id,
                        name: name,
                        image: image
                    }
                };
            })
            const data = {
                chats: msgList
            }
            return data
        } catch (err) {
            return util.databaseError(err,'getMessagePreview',res);
        }
    },

    sendMessage: async ( my_ID, seller_ID ) => {
        try {
            const sql = 'INSERT INTO chat (sender_id, receiver_id, message) VALUES (?, ?, ?)'
            const [results] = await db.query(sql, [my_ID,seller_ID,message])
            const data = {
                id: results.insertId, 
            };
            return data
        } catch (err) {
            return util.databaseError(err,'sendMessage',res);
        }
    }
}