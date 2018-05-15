const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var LunboSchema = new mongoose.Schema({ 
    sid:Number,
    url:String,
    title:String,
    price:String,
    num:Number,
    username:String,
    caizhi:String,
    state:String//是否付款
 });

LunboSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Cart',  LunboSchema);