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
            const [user_id] = await db.query('SELECT seller_id FROM item WHERE id = ?', [id])
            const seller_id = user_id[0].seller_id;
            const user = await getUser(res, seller_id);
            const sql = 'SELECT seller_id, title, image, introduction, cost, tag, item_location \
            FROM item WHERE id = ?'
            const [results] = await db.query(sql, [id]);
            console.log(results);
            const item = {
                id: id,
                title: results[0].title, 
                image: results[0].image, 
                introduction: results[0].introduction, 
                cost: results[0].cost, 
                tag: results[0].tag, 
                costco: results[0].costco,
                item_location: results[0].item_location,
                buyer_id: results[0].buyer_id,
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
            const sql = `SELECT item.id, item.title, item.image, item.introduction, item.cost, item.tag, item.item_location, item.buyer_id, item.seller_id, user.name, user.rating \
            FROM item LEFT JOIN user ON item.seller_id = user.id\
            WHERE item.id <= ${item_id}\
            ORDER BY item.id DESC LIMIT ?`;
            const [results] = await db.query(sql, [limit]);
            if(results.length === 0){
                return [];
            }
            let items = [];
            // for(let i = 0; i < results.length; i++){
            //     const item = {
            //         id: results[i].id,
            //         title: results[i].title, 
            //         image: results[i].image, 
            //         introduction: results[i].introduction, 
            //         cost: results[i].cost, 
            //         tag: results[i].tag, 
            //         costco: results[i].costco,
            //         item_location: results[i].item_location,
            //         buyer_id: results[i].buyer_id,
            //         expires_at: results[i].expires_at,
            //         user: {
            //             id: results[i].seller_id,
            //             name: results[i].name,
            //             rating: results[i].rating
            //         }
            //     };
            //     items.push(item);
            // }
            results.map(result => {
                // console.log(result)
                const item = {
                    id: result.id,
                    title: result.title, 
                    image: result.image, 
                    introduction: result.introduction, 
                    cost: result.cost, 
                    tag: result.tag, 
                    costco: result.costco,
                    item_location: result.item_location,
                    buyer_id: result.buyer_id,
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
    },
    addBuyer: async ( res, id, buyer_id ) => {
        try{
            const sql = 'UPDATE item SET buyer_id = ? WHERE id = ?'
            const [results] = await db.query(sql, [buyer_id, id]);
            console.log(results);
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

