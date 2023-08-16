const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {
    addEvent: async (res, item_id, type, sender_id, recipient_id) => {
        try {
            const sql = 'INSERT INTO event (item_id, type, sender_id, recipient_id) VALUES (?,?,?,?)'
            const [results] = await db.query(sql, [item_id, type, sender_id, recipient_id])
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
            const sql = 'SELECT event.id, event.type, event.sender_id, event.recipient_id, user.name, user.image, order_table.status\
            FROM event LEFT JOIN user ON event.sender_id = user.id\
            LEFT JOIN order_table ON (order_table.seller_id = event.sender_id AND order_table.buyer_id = event.recipient_id) OR (order_table.seller_id = event.recipient_id AND order_table.buyer_id = event.sender_id)\
            WHERE event.recipient_id = ? ORDER BY event.id DESC';
            const [results] = await db.query(sql, [id]);
            if (results.length === 0) {
                return [];
            }
            let events = [];
            results.map(result => {
                const event = {
                    id: result.id,
                    type: result.type,
                    recipient_id: result.recipient_id,
                    order:{
                        status: result.status
                    }, 
                    user: {
                        name: result.name,
                        image: result.image,
                        sender_id: result.sender_id
                    }
                };
                events.push(event);
            });
            return events; 
        } catch (err) {
            return util.databaseError(err, 'getEvent', res);
        }
    }    
}