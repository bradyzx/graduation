var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/cart.controller');

router.post('/data',dataCtrl.create);
router.put('/data/:sid',dataCtrl.update);
router.delete('/data/:id',dataCtrl.remove);
router.post('/list',dataCtrl.list);
router.post('/data/removes',dataCtrl.removes);

module.exports = router;
