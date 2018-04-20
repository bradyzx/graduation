var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/orderlist.controller');

router.post('/data',dataCtrl.create);
router.put('/data/:id',dataCtrl.update);
router.delete('/data/:id',dataCtrl.remove);
router.post('/list',dataCtrl.list);
router.post('/data/removes',dataCtrl.removes);


router.post('/uploadImg',dataCtrl.removes);


module.exports = router;
