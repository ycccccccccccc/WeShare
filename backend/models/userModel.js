const bcrypt = require('bcrypt');
const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {

    signup: async ( res, name, email, password ) => {
        try {
            const hashPwd = bcrypt.hashSync(password, 10);
            const sql = "INSERT INTO user (name, email, password) VALUES (?,?,?)"
            const [results] = await db.query(sql, [name,email,hashPwd])
            const user = {
                id: results.insertId, 
                name: name, 
                email: email, 
            };
            const data = {
                access_token: util.generateToken(user),
                user: user
            }
            return data
        } catch (err) {
            return util.databaseError(err,'signup',res);
        }
    },

    signin: async ( res, email, password ) => {
        try {
            const sql = "SELECT * FROM user WHERE email = ?"
	        const [[results]] = await db.query(sql, [email])
            if( results === undefined ) {
                return "No user were found with given email."
            } else if ( !bcrypt.compare(password, results.password) ) {
                return "Wrong password."
            } else {
                const user = {
                    id: results.id,
                    name: results.name,
                    email: results.email
                }
                const data = {
                    access_token: util.generateToken(user),
                    user: user
                }
                return data
            }
        } catch (err) {
            return util.databaseError(err,'signin',res);
        }
    },

    findUser: async ( res, email ) => {
        try {
            const sql = "SELECT id, name, email FROM user WHERE email = ?"
            const [results] = await db.query(sql, [email])
            console.log("finduser:",results[0],email,"id")
            const existUser = results[0] === undefined ? false : true
            return existUser
        } catch (err) {
            return util.databaseError(err,'findUser',res);
        }
    },

    getUser: async ( res, id ) => {
        try {
            const sql = "SELECT name, rating FROM user WHERE id = ?"
            const [results] = await db.query(sql, [id]);
            return results[0]
        } catch (err) {
            return util.databaseError(err,'getUser',res);
        }
    },

    updateProfile: async ( res, id, name, image ) => {
        try {
            const sql = "UPDATE user SET name = ?, image = ? WHERE id = ?"
            await db.query(sql, [name,image,id]);
            const data = {
                user: { id: id }
            }
            return data
        } catch (err) {
            return util.databaseError(err,'getUser',res);
        }
    },

    getUserInfo: async ( res, user_ID ) => {
        try {
            const sql = `SELECT name, image, rating FROM user WHERE id = ?`
            const [[results]] = await db.query(sql, [user_ID]);
            const data = {
                user: {
                    id: user_ID,
                    name: results.name,
                    image: results.image,
                    rating: results.rating,
                    item: []
                }
            }
            return data
        } catch (err) {
            return util.databaseError(err,'getUserInfo',res);
        }
    },

    getUserItem: async ( res, user_ID ) => {
        try {
            const sql = `SELECT id, title, image, cost, tag, expires_at FROM item WHERE seller_id = ?`
            const [results] = await db.query(sql, [user_ID]);
            const itemList = results.map((result) => {
                const { id, title, image, cost, tag, expires_at } = result
                return {
                    id: id,
                    title : title,
                    image: image,
                    cost: cost,
                    tag: tag,
                    expires_at: expires_at
                };
            })
            return itemList
        } catch (err) {
            return util.databaseError(err,'getUserItem',res);
        }
    },

    addTest:  async ( res ) => {
        try {
            for ( var i = 1 ; i <= 11 ; i++ ){
                const sql = `INSERT INTO user (name, email, password) VALUES (?,?,?)`
                await db.query(sql, [
                    "user" + i.toString(),
                    "user" + i.toString() + "@gmail.com",
                    "pwd"
                ]);
            }
            return "user added."
        } catch (err) {
            return util.databaseError(err,'getUserItem',res);
        }
    },

    giveRating: async ( res, sender_id, receiver_id, rating ) => {
        try {
            const sql = `INSERT INTO rating (sender_id, receiver_id, rating) VALUES (?,?,?)`
            const [results] = await db.query(sql, [sender_id,receiver_id,rating]);
            const result = {
                id: results.insertId
            }
            return result;
        } catch (err) {
            return util.databaseError(err,'getUserItem',res);
        }
    },

    updateAvgRating: async ( res, receiver_id ) => {
        try {
            const sql = `
                SELECT COUNT(*) AS receive_count,
                SUM(CASE WHEN receiver_id = ? THEN rating ELSE 0 END) AS rating_sum
                FROM rating
                WHERE receiver_id = ?;
            `
            const [[results]] = await db.query(sql, [receiver_id,receiver_id]);
            const { receive_count, rating_sum } = results
            console.log(receive_count, rating_sum, parseFloat((rating_sum/receive_count).toFixed(2)))
            const sql_update = "UPDATE user SET rating = ? WHERE id = ?"
            await db.query(sql_update, [parseFloat((rating_sum/receive_count).toFixed(2)), receiver_id])
            return { id: receiver_id }
        } catch (err) {
            return util.databaseError(err,'getUserItem',res);
        }
    },
}
