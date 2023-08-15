const userModel = require('../models/userModel')
const util = require('../utils/util')

module.exports = {
    signin: async (req, res) => {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // 確認信箱存在
        const existMail = await userModel.findUser(res, email)
        if ( !existMail ) {
            return res.status(403).json({ error: "No user found with the given email" });
        }
        // 確認密碼跟信箱相符
        const result = await userModel.signin(res, email, password);
	console.log(result)
        if ( !result ) {
            return res.status(403).json({ error: "Wrong Password" }); 
        } else {
            return res.status(200).json({ data: result }); 
        }
    },
    signup: async (req, res) => {
        const { name, email, password } = req.body;
        if ( !name || !email || !password ) {    
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // 確認信箱格式正確
        const isValidMail = util.emailValidate(email)
        if ( !isValidMail ) {
            return res.status(400).json({ error: 'Email format is incorrect' });
        }
        // 確認信箱存在
        const existUser = await userModel.findUser(res,email);
        if ( existUser ) {
            return res.status(403).json({ error: 'Email already exists' });
        }
        const result = await userModel.signup(res,name,email,password)
        return res.status(200).json({ data: result })
    },
}
