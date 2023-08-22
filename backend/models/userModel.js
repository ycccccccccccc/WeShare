const bcrypt = require('bcrypt');
const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {

    signup: async ( res, name, phone, password ) => {
        try {
            const hashPwd = bcrypt.hashSync(password, 10);
            const sql = "INSERT INTO user (name, phone, password) VALUES (?,?,?)"
            const [results] = await db.query(sql, [name,phone,hashPwd])
            const user = {
                id: results.insertId, 
                name: name, 
                phone: phone, 
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

    signin: async ( res, phone, password ) => {
        try {
            const sql = "SELECT * FROM user WHERE phone = ?"
	        const [[results]] = await db.query(sql, [phone])
            if( results === undefined ) {
                return "No user were found with given phone."
            } else if ( !bcrypt.compare(password, results.password) ) {
                return "Wrong password."
            } else {
                const user = {
                    id: results.id,
                    name: results.name,
                    phone: results.phone
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

    findUser: async ( res, phone ) => {
        try {
            const sql = "SELECT id, name, phone FROM user WHERE phone = ?"
            const [results] = await db.query(sql, [phone])
            console.log("finduser:",results[0],phone,"id")
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

    updateProfileName: async ( res, id, name ) => {
        try {
            const sql = "UPDATE user SET name = ? WHERE id = ?"
            await db.query(sql, [name,id]);
            const data = {
                user: { id: id }
            }
            return data
        } catch (err) {
            return util.databaseError(err,'getUser',res);
        }
    },

    updateProfilePic:  async ( res, id, image ) => {
        try {
            const sql = "UPDATE user SET image = ? WHERE id = ?"
            await db.query(sql, [image,id]);
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
            const sql = `SELECT name, image, phone, rating FROM user WHERE id = ?`
            const [[results]] = await db.query(sql, [user_ID]);
            const data = {
                user: {
                    id: user_ID,
                    name: results.name,
                    image: results.image,
		            phone: results.phone,
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
            const sql = `
		SELECT id, title, image, cost, tag 
		FROM item 
		WHERE seller_id = ?
		ORDER BY id DESC
		`
            const [results] = await db.query(sql, [user_ID]);
            const itemList = results.map((result) => {
                const { id, title, image, cost, tag } = result
                return {
                    id: id,
                    title : title,
                    image: image,
                    cost: cost,
                    tag: tag
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
                const sql = `INSERT INTO user (name, phone, password) VALUES (?,?,?)`
                await db.query(sql, [
                    "user" + i.toString(),
                    util.generateRandomNum(10),
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
            const data = {
                rating: {
                    id: results.insertId
                }
            }
            return data;
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
            return true
        } catch (err) {
            return util.databaseError(err,'getUserItem',res);
        }
    },
}
