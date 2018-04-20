const mongoose = require('mongoose');
const Message = require('../model/message.model');

//增
exports.create = function(req,res,next){
    const message = new Message(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    message.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//删
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Message.findByIdAndRemove(id,function(err,data){
        res.json({massage:'删除成功'});
    });
};

exports.removes = function(req,res,next){
    //先查找到一个id值
    var ids = req.body.ids;
    ids = ids.split(',');
    console.log(ids);
    if(ids.length>0){
        Message.remove({_id:{$in:ids}}).then(data=>{
            res.json({massage:'删除多条数据成功'});
        });
    }
};

//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Message.findByIdAndUpdate(id,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};

//查
exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 5;
    var queryCondition = {};

    if(req.body.reply && req.body.reply.trim().length>0){   //trim（）去空格
        reply = req.body.reply;
        console.log(reply);
        queryCondition = {
            reply: new RegExp(reply,'i')
        }
    }
    if(req.body.username && req.body.username.trim().length>0){   //trim（）去空格
        username = req.body.username;
        queryCondition = Object.assign(queryCondition,{  //对象合并    
            username: new RegExp(username,'i')
        });
    }
    
    //            查询条件            分页         一页的条数           回调函数
    Message.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
      });
}

//查
exports.lists = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 5;
    var queryCondition = {};

    queryCondition = {
        reply: {$ne:"null"}
    };
    if(req.body.username && req.body.username.trim().length>0){   //trim（）去空格
        username = req.body.username;
        queryCondition = Object.assign(queryCondition,{  //对象合并    
            username: new RegExp(username,'i')
        });
    }
    
    //            查询条件            分页         一页的条数           回调函数
    Message.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
      });
}