const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var MessageSchema = new mongoose.Schema({ 
    proname:String,
    username:String,
    mtime: {type:Date},
    mcon: String,
    reply: String,
    proId: mongoose.Schema.ObjectId
 });

 MessageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Message',  MessageSchema);