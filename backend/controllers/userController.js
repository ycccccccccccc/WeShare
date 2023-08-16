const userModel = require('../models/userModel')
const util = require('../utils/util')

module.exports = {
    signin: async (req, res) => {
        const { email, password } = req.body;
        if ( !email || !password ) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        // 確認密碼跟信箱相符
        const result = await userModel.signin(res, email, password);
        if ( !result.user ) {
            return res.status(403).json({ error: result }); 
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
    updateProfile: async (req, res) => {
        const my_ID = req.user.id;
        const { name, image } = req.body;
        const result = await userModel.updateProfile(res,my_ID,name,image)
        return res.status(200).json({ data: result })
    },
    getProfile: async (req, res) => {
        const user_ID = req.params.id
        const user_info = await userModel.getUserInfo(res,user_ID)
        const user_item = await userModel.getUserItem(res,user_ID)
        user_info.user.item.push(...user_item)
        console.log(user_info)
        return res.status(200).json({ data: user_info })
    },
}
