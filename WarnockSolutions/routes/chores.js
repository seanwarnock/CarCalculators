var express = require('express');
var router = express.Router();
var hellome = 'onload="gearchoice()"'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('chores', { title: 'Warnock Solutions' });
});

module.exports = router;
