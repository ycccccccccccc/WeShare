const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {
    addOrder: async ( res, item_id, seller_id, buyer_id ) => {
        try {
            const sql = 'INSERT INTO order_table (item_id, seller_id, buyer_id, status) VALUES (?,?,?,?)';
            const [results] = await db.query(sql, [item_id, seller_id, buyer_id, 'request']);
            const order = {
                id: results.insertId, 
            };
            return order;
        } catch (err) {
            return util.databaseError(err,'addOrder',res);
        }
    },
    getIDs: async ( res, order_id) => {
        try {
            const sql = 'SELECT item_id, seller_id, buyer_id, status FROM order_table WHERE id = ?'
            const [results] = await db.query(sql, [order_id]);
            const order = {
                item_id: results[0].item_id, 
                seller_id: results[0].seller_id, 
                buyer_id: results[0].buyer_id, 
                status: results[0].status
            };
            return order;
        } catch (err) {
            return util.databaseError(err,'getIDs',res);
        }
    },
    agreeOrder: async ( res, item_id ) => {
        try {
            const sql = 'UPDATE order_table SET status = ? WHERE id = ?';
            const [results] = await db.query(sql, ['agree', item_id]);
            const order = {
                id: item_id
            };
            return order;
        } catch (err) {
            return util.databaseError(err,'agreeOrder',res);
        }
    }
}