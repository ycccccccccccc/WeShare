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
	        const [results] = await db.query(sql, [email])
	    if ( !bcrypt.compare(password, results[0].password) ) {
		return false
            } else {
                const user = {
                    id: results[0].id,
                    name: results[0].name,
                    email: results[0].email
                }
                const data = {
                    access_token: util.generateToken(user),
                    user: user
                }
		console.log(data)
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
    
}
