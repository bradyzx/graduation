var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../../front/index', {username:req.session.username });
});
// router.post('/data/removes',dataCtrl.removes);



module.exports = router;
