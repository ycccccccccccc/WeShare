const { getNumOfBuyers, getSeller } = require('../models/itemModel');
const orderModel = require('../models/orderModel')

module.exports = {
    addOrder: async (req, res) => {
        const buyer_id = req.user.id;
        const item_id = parseInt(req.params.id);
        const get_seller = await getSeller(res, item_id);
        const seller_id = get_seller.seller_id;
        console.log(item_id, seller_id, buyer_id);
        if(buyer_id === seller_id){
            return res.status(400).json({
                error: "Can't buy own product!"
            })
        }
        const result = await orderModel.addOrder(res, item_id, seller_id, buyer_id);
        return res.status(200).json({ order: result });
    },
    agreeOrder: async (req, res) => {
        const seller_id = req.user.id;
        const item_id = parseInt(req.params.id);
        const checkSeller = await getSeller( res, item_id );
        if( checkSeller.seller_id !== seller_id){
            return res.status(400).json({
                error: "Insufficient permissions!"
            })
        }
        const checkOrder = await getNumOfBuyers(res, item_id);
        if( checkOrder.num_of_buyers <= 0 ){
            return res.status(400).json({
                error: "Order limit exceeded!"
            })
        }
        const result = await orderModel.agreeOrder(res, item_id);
        return res.status(200).json({ order: result });
    }
}