const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var ProSchema = new mongoose.Schema({ 
    protype: String,
    proimg:String,
    proname:String,
    proprice: String,
    prosale: String,
    propress: String,
    ispromotion:String,
    pronum:String
    // cateId: mongoose.Schema.ObjectId
 });

 ProSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Pro',  ProSchema);