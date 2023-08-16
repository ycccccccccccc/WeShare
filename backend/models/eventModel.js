const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {
    addEvent: async (res, type, sender_id, recipient_id) => {
        try {
            const sql = 'INSERT INTO event (type, sender_id, recipient_id) VALUES (?,?,?)'
            const [results] = await db.query(sql, [type, sender_id, recipient_id])
            const event = {
                id: results.insertId, 
            };
            return event;
        } catch (err) {
            return util.databaseError(err,'addEvent',res);
        }
    },
    getEvent: async (res, id) => {
        try {
            const sql = 'SELECT item_id, seller_id, buyer_id, status FROM event\
            LEFT JOIN user ON item.seller_id = user.id\
            WHERE recipient_id = ?'
            const [results] = await db.query(sql, [id])
            const event = {
                id: results.insertId, 
            };
            return event;
        } catch (err) {
            return util.databaseError(err,'getEvent',res);
        }
    }
}