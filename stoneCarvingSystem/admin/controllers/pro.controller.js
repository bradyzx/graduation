const mongoose = require('mongoose');
const Pro = require('../model/pro.model');
var multiparty = require('multiparty');
var fs = require('fs');

//增
exports.create = function(req,res,next){
    const pro = new Pro(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    pro.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//删
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Pro.findByIdAndRemove(id,function(err,data){
        res.json({massage:'删除成功'});
    });
};

exports.removes = function(req,res,next){
    //先查找到一个id值
    var ids = req.body.ids;
    ids = ids.split(',');
    console.log(ids);
    if(ids.length>0){
        Pro.remove({_id:{$in:ids}}).then(data=>{
            res.json({massage:'删除成功'});
        });
    }
};

//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Pro.findByIdAndUpdate(id,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};

//查
exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.limit ? req.body.limit : 5;
    var queryCondition = {};

    if(req.body.proname && req.body.proname.trim().length>0){   //trim（）去空格
        proname = req.body.proname;
        console.log(proname);
        queryCondition = {
            proname: new RegExp(proname,'i')
        }
    }

    //            查询条件            分页         一页的条数           回调函数
    Pro.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        console.log('proname'+result.rows);
        res.json(result)
      });
}



// routes/api.js中
const formidable = require('formidable');
var sd = require("silly-datetime");
var AVATAR_UPLOAD_FOLDER = '/avatar/'; // 上传图片存放路径，注意在本项目public文件夹下面新建avatar文件夹

// 上传图片
exports.uploadImg = function (req, res, next) {
    var form = new formidable.IncomingForm();   //创建上传表单
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;    //设置上传目录
    form.keepExtensions = true;  //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {

        if (err) {
            return res.json({
                "code": 500,
                "message": "内部服务器错误"
            })
        }

        // 限制文件大小 单位默认字节 这里限制大小为2m
        if (files.fulAvatar.size > form.maxFieldsSize) {
            fs.unlink(files.fulAvatar.path)
            return res.json({
                "code": 401,
                "message": "图片应小于2M"
            })
        }

        var extName = '';  //后缀名
        switch (files.fulAvatar.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            return res.json({
                "code": 404,
                "message": "只支持png和jpg格式图片"
            })
        }

        //使用第三方模块silly-datetime
        var t = sd.format(new Date(), 'YYYYMMDDHHmmss');
        //生成随机数
        var ran = parseInt(Math.random() * 8999 + 10000);

        // 生成新图片名称
        var avatarName = t + '_' + ran + '.' + extName;
        // 新图片路径
        var newPath = form.uploadDir + avatarName;

        // 更改名字和路径
        fs.rename(files.fulAvatar.path, newPath, function (err) {
            if (err) {
                return res.json({
                    "code": 401,
                    "message": "图片上传失败"
                })
            }
            return res.json({
                "code": 200,
                "message": "上传成功",
                result: AVATAR_UPLOAD_FOLDER + avatarName
            })
        })
    });

}