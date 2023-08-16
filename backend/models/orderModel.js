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