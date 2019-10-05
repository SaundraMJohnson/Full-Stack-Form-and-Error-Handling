var express = require('express');
var router = express.Router();

var adminRouter = require('./admin');
var formRouter = require('./form');

router.use('/admin', adminRouter);
router.use('/form', formRouter);

module.exports = router;