const util = require('../utils/util')
const { db } = require('../utils/util');
const { getUser } = require('./userModel');

module.exports = {

    addItem: async ( res, seller_id, title, introduction, cost, tag, costco, item_location, expires_at ) => {
        try {
            const sql = 'INSERT INTO item (seller_id, title, introduction, cost, tag, costco, item_location, expires_at) VALUES (?,?,?,?,?,?,?,?)'
            const [results] = await db.query(sql, [seller_id, title, introduction, cost, tag, costco, item_location, expires_at])
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
    getItem: async ( res, id ) => {
        try {
            const sellerResult = await this.getSeller(res, id);
            const seller_id = sellerResult.seller_id;
            const user = await getUser(res, seller_id);
            const sql = 'SELECT seller_id, title, image, introduction, cost, tag, item_location \
            FROM item WHERE id = ?'
            const [results] = await db.query(sql, [id]);
            const item = {
                id: id,
                title: results.title, 
                image: results.image, 
                introduction: results.introduction, 
                cost: results.cost, 
                tag: results.tag, 
                costco: results.costco,
                item_location: results.item_location,
                buyer_id: results.buyer_id,
                expires_at: results.expires_at,
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
            const sql = 'SELECT item.id, item.title, item.image, item.introduction, item.cost, item.tag, item.item_location, item.buyer_id, item.seller_id, user.name, user.rating \
            FROM item LEFT JOIN user ON item.seller_id = user.id\
            WHERE item.id <= ? \
            ORDER BY item.id DESC LIMIT ?'
            const [results] = await db.query(sql, [item_id, limit]);
            let items = [];
            results.map(data => {
                const item = {
                    id: data.id,
                    title: data.title, 
                    image: data.image, 
                    introduction: data.introduction, 
                    cost: data.cost, 
                    tag: data.tag, 
                    costco: results.costco,
                    item_location: results.item_location,
                    buyer_id: results.buyer_id,
                    expires_at: results.expires_at,
                    user: {
                        id: data.seller_id,
                        name: data.name,
                        rating: data.rating
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
            const result = await db.query(sql, [url, id]);
            const path = {
                photo: url 
            }
            return path;
        } catch (err) {
            return util.databaseError(err,'updateItemPhoto',res);
        }
    },
    addBuyer: async ( res, id, buyer_id ) => {
        try{
            const sql = 'UPDATE item SET buyer_id = ? WHERE id = ?'
            const result = await db.query(sql, [buyer_id, id]);
            const item = {
                id: id,
                buyer_id: buyer_id
            }
            return item;
        } catch (err) {
            return util.databaseError(err,'addBuyer',res);
        }
    }
    
}