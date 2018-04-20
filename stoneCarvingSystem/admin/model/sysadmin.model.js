const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var AdminSchema = new mongoose.Schema({ 
    name: String,
    password:String
 });

 AdminSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Sysadmin',  AdminSchema);