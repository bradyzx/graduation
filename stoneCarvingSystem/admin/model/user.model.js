const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var UserSchema = new mongoose.Schema({ 
    username: String,
    userpassword:String,
    useremail: String,
    userqq: String,
    userphone: String,
    useraddress:String
 });

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Customer',  UserSchema);