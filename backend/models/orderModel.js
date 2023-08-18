const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {
    addOrder: async ( res, item_id, quantity, seller_id, buyer_id ) => {
        try {
            const sql = 'INSERT INTO order_table (item_id, quantity, seller_id, buyer_id, status) VALUES (?,?,?,?)';
            const [results] = await db.query(sql, [item_id, quantity, seller_id, buyer_id, 'request']);
            const order = {
                id: results.insertId
            };
            return order;
        } catch (err) {
            return util.databaseError(err,'addOrder',res);
        }
    },
    getOrder: async ( res, order_id ) => {
        try {
            const sql = 'SELECT item_id, quantity, seller_id, buyer_id, status FROM order_table WHERE id = ?'
            const [[results]] = await db.query(sql, [order_id]);
            const order = {
                item_id: results.item_id,
                quantity: results.quantity,
                seller_id: results.seller_id, 
                buyer_id: results.buyer_id, 
                status: results.status
            };
            return order;
        } catch (err) {
            return util.databaseError(err,'getIDs',res);
        }
    },
    agreeOrder: async ( res, order_id ) => {
        try {
            const sql = 'UPDATE order_table SET status = ? WHERE id = ?';
            const [results] = await db.query(sql, ['agree', order_id]);
            const order = {
                id: order_id
            };
            return order;
        } catch (err) {
            return util.databaseError(err,'agreeOrder',res);
        }
    }
}