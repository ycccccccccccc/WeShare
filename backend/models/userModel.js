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

    signin: async ( email, password ) => {
        try {
            const sql = "SELECT * FROM user WHERE email = ?"
	        const [results] = await db.query(sql, [email])
            console.log("result check:",bcrypt.hashSync(password, 10),results.password,email)
            if ( bcrypt.hashSync(password, 10) !== results.password ) {
                return false
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

    findUser: async ( email ) => {
        try {
            const sql = "SELECT id, name, email FROM user WHERE email = ?"
            const results = await db.query(sql, [email])
            const existUser = results.id === undefined ? false : true
            return existUser
        } catch (err) {
            return util.databaseError(err,'findUser',res);
        }
    },

    getUser: async ( id ) => {
        try {
            const sql = "SELECT name, rating FROM user WHERE id = ?"
            const [results] = await db.query(sql, [id]);
            return results[0]
        } catch (err) {
            return util.databaseError(err,'getUser',res);
        }
    },
    
}
