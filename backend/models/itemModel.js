const util = require('../utils/util')
const { db } = require('../utils/util');
const { getUser } = require('./userModel');

module.exports = {

    addItem: async ( res, seller_id, buyers_limit, title, introduction, cost, tag, costco, item_location, expires_at ) => {
        try {
            const sql = 'INSERT INTO item (seller_id, buyers_limit, num_of_buyers, title, introduction, cost, tag, costco, item_location, expires_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
            const [results] = await db.query(sql, [seller_id, buyers_limit, buyers_limit, title, introduction, cost, tag, costco, item_location, expires_at])
            const item = {
                id: results.insertId, 
            };
            return item;
        } catch (err) {
            return util.databaseError(err,'addItem',res);
        }
    },
    getSeller: async ( res, id ) => {
        try {
            const sql = 'SELECT seller_id FROM item WHERE id = ?'
            const [results] = await db.query(sql, [id])
            return results[0];
        } catch (err) {
            return util.databaseError(err,'getSeller',res);
        }
    },
    getNumOfBuyers: async ( res, id ) => {
        try{
            const sql = 'SELECT num_of_buyers FROM item WHERE id = ?'
            const [results] = await db.query(sql, [id]);
            console.log(results);
            return results[0];
        } catch (err) {
            return util.databaseError(err,'getNumOfBuyers',res);
        }
    },
    getItem: async ( res, id ) => {
        try {
            const [user_id] = await db.query('SELECT seller_id FROM item WHERE id = ?', [id])
            const seller_id = user_id[0].seller_id;
            const user = await getUser(res, seller_id);
            const sql = 'SELECT seller_id, buyers_limit, title, image, introduction, cost, tag, item_location \
            FROM item WHERE id = ?'
            const [results] = await db.query(sql, [id]);
            console.log(results);
            const item = {
                id: id,
                title: results[0].title, 
                buyers_limit: results[0].buyers_limit,
                image: results[0].image, 
                introduction: results[0].introduction, 
                cost: results[0].cost, 
                tag: results[0].tag, 
                costco: results[0].costco,
                item_location: results[0].item_location,
                expires_at: results[0].expires_at,
                user: {
                    id: seller_id,
                    name: user.name,
                    rating: user.rating
                }
            };
            return item;
        } catch (err) {
            return util.databaseError(err,'getItem',res);
        }
    },
    getItems: async ( res, item_id, limit ) => {
        try {
            limit = limit +1;
            if (!item_id) {
                item_id = '(SELECT MAX(id) FROM item)';
            }
            const sql = `SELECT item.id, item.buyers_limit, item.title, item.image, item.introduction, item.cost, item.tag, item.item_location, item.seller_id, user.name, user.rating \
            FROM item LEFT JOIN user ON item.seller_id = user.id\
            WHERE item.id <= ${item_id}\
            ORDER BY item.id DESC LIMIT ?`;
            const [results] = await db.query(sql, [limit]);
            if(results.length === 0){
                return [];
            }
            let items = [];
            results.map(result => {
                const item = {
                    id: result.id,
                    buyers_limit: result.buyers_limit,
                    title: result.title, 
                    image: result.image, 
                    introduction: result.introduction, 
                    cost: result.cost, 
                    tag: result.tag, 
                    costco: result.costco,
                    item_location: result.item_location,
                    expires_at: result.expires_at,
                    user: {
                        id: result.seller_id,
                        name: result.name,
                        rating: result.rating
                    }
                };
                items.push(item);
            })
            return items;            
        } catch (err) {
            return util.databaseError(err,'getItems',res);
        }
    },
    updateItem: async ( res, id, title, introduction, cost, tag, costco, item_location, expires_at) => {
        try {
            const sql = 'UPDATE item SET title = ?, introduction = ?, cost = ?, tag = ?, costco = ?, item_location = ?, expires_at = ? WHERE id = ?'
            const [results] = await db.query(sql, [title, introduction, cost, tag, costco, item_location, expires_at]);
            console.log(results);
            const item = {
                id: id,
            };
            return item;
        } catch (err) {
            return util.databaseError(err,'updateItem',res);
        }
    },
    updateItemPhoto: async ( res, id, url ) => {
        try{
            const sql = 'UPDATE item SET photo = ? WHERE id = ?'
            const [results] = await db.query(sql, [url, id]);
            console.log(results);
            const path = {
                photo: url 
            }
            return path;
        } catch (err) {
            return util.databaseError(err,'updateItemPhoto',res);
        }
    }
}

