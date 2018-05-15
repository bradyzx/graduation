const mongoose = require('mongoose');
const Cart = require('../model/cart.model');


//增
exports.create = function(req,res,next){
    const cart = new Cart(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    cart.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//删
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Cart.findByIdAndRemove(id,function(err,data){
        res.json({massage:'删除成功'});
    });
};

exports.removes = function(req,res,next){
    //先查找到一个id值
    var ids = req.body.ids;
    ids = ids.split(',');
    console.log(ids);
    if(ids.length>0){
        Cart.remove({_id:{$in:ids}}).then(data=>{
            res.json({massage:'删除成功'});
        });
    }
};

//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const sid = req.params.sid;
    Cart.findByIdAndUpdate(sid,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};

//查
exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 5;
    var queryCondition = {};

    if(req.body.sid && req.body.sid.trim().length>0){   //trim（）去空格
        sid = req.body.sid;
        queryCondition = {
            sid: sid,
            caizhi: req.body.caizhi
        }
    }
    if(req.body.state && req.body.state.trim().length>0){   //trim（）去空格
        queryCondition = Object.assign(queryCondition,{  //对象合并    
            state: req.body.state
        });
    }
    if(req.body.username && req.body.username.trim().length>0){   //trim（）去空格
        username = req.body.username;
        queryCondition = Object.assign(queryCondition,{  //对象合并    
            username: username
        });
    }
console.log(queryCondition);
    //            查询条件            分页         一页的条数           回调函数
    Cart.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        res.json(result);
      });
}