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
            const sql = `SELECT id, title, image, cost, tag, expired_at FROM item WHERE seller_id = ?`
            const [results] = await db.query(sql, [user_ID]);
            const itemList = results.map((result) => {
                const { id, title, image, cost, tag, expired_at } = result
                return {
                    id: id,
                    title : title,
                    image: image,
                    cost: cost,
                    tag: tag,
                    expired_at: expired_at
                };
            })
            return itemList
        } catch (err) {
            return util.databaseError(err,'getUserItem',res);
        }
    },
}
