const bcrypt = require('bcrypt');
const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {

    getMessage: async ( res, my_ID, seller_ID ) => {
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

    getMessagePreview: async ( res, my_ID ) => {
        try {
            const sql = `
                WITH receive_msg AS (
                    SELECT id, receiver_id, message
                    FROM chat 
                    WHERE sender_id = ?
                ),
                send_msg AS (
                    SELECT id, sender_id, message
                    FROM chat 
                    WHERE receiver_id = ?
                ),
                combined_msgs AS (
                    SELECT id, receiver_id AS contact_id, message
                    FROM receive_msg
                    UNION ALL
                    SELECT id, sender_id AS contact_id, message
                    FROM send_msg
                ),
                msg_result AS (
                    SELECT contact_id, id, message
                    FROM (
                        SELECT contact_id, id, message,
                            ROW_NUMBER() OVER (PARTITION BY contact_id ORDER BY id DESC) AS rn
                        FROM combined_msgs
                    ) ranked_msgs
                    WHERE rn = 1
                    ORDER BY id DESC
                ),
                SELECT mr.id, mr.contact_id, mr.message, u.name, u.image
                FROM msg_result AS mr LEFT JOIN user AS u
                ON mr.contact_id = u.id
            `
            const [results] = await db.query(sql, [my_ID,my_ID])
            const msgList = results.map((result) => {
                const { id, contact_id, message, name, image } = result
                return {
                    id: id,
                    message: message,
                    user: {
                        id: contact_id,
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

    sendMessage: async ( res, my_ID, seller_ID ) => {
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
