const mongoose = require('mongoose');
const Sysadmin = require('../model/sysadmin.model');

//增
exports.create = function(req,res,next){
    const sysadmin = new Sysadmin(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    sysadmin.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//删
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Sysadmin.findByIdAndRemove(id,function(err,data){
        res.json({massage:'删除成功'});
    });
};

exports.removes = function(req,res,next){
    //先查找到一个id值
    var ids = req.body.ids;
    ids = ids.split(',');
    console.log(ids);
    if(ids.length>0){
        Sysadmin.remove({_id:{$in:ids}}).then(data=>{
            res.json({massage:'删除成功'});
        });
    }
};

//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Sysadmin.findByIdAndUpdate(id,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};

// //查
// exports.list = function(req,res,next){
//     var page = req.body.page ? req.body.page : 1;
//     var limit = req.body.limit ? req.body.limit : 5;
//     var queryCondition = {};

//     if(req.body.name && req.body.name.trim().length>0){   //trim（）去空格
//         name = req.body.name;
//         console.log(name);
//         queryCondition = {
//             name: new RegExp(name,'i')
//         }
//     }

//     //            查询条件            分页         一页的条数           回调函数
//     Sysadmin.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
//         result.rows = result.docs;
//         delete result.docs;
//         res.json(result)
//       });
// }
//查
exports.list = function(req,res,next){
    const name = req.body.name;
    const password = req.body.password;
    Sysadmin.find({name:name,password:password},function(err,data){
        req.session.name = data[0].name;                //存session的name
        console.log(data[0].name);
        res.json(data);
    });
};