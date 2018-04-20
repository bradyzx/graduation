const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var orderlistSchema = new mongoose.Schema({ 
    username: String,//用户名
    proname: String,//商品名
    ordernum:Number,//下单数量
    ordertime:{type:Date},//下单时间
    orderstate:String,//订单状态     未审核  可发货  已发货
    address:String,//收货地址
    beizhu:String//备注
 });

orderlistSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Orderlist',  orderlistSchema);