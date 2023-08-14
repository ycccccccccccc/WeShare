const bcrypt = require('bcrypt');
const util = require('../utils/util')
const { db } = require('../utils/util');

module.exports = {

    signup: async ( res, name, email, password ) => {
        try {
            const hashPwd = bcrypt.hashSync(password, 10);
            const sql = 'INSERT INTO users (Name, Email, Password) VALUES (?,?,?)'
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
            const sql = 'SELECT * FROM user WHERE email = ?'
            const [results] = await db.query(sql, [email])
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

    findUser: async ( res, email ) => {
        try {
            const sql = 'SELECT id FROM user WHERE email = ?'
            const [results] = await db.query(sql, [email])
            const existUser = results.id === undefined ? false : true
            return existUser
        } catch (err) {
            return util.databaseError(err,'findUser',res);
        }
    },

    
}