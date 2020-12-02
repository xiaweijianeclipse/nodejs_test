var express = require('express');
var router = express.Router();
var yewu = require('./yewu');

router.get('/', yewu.getall)
    .get('/getone', yewu.getone)
    .get('/upuser', yewu.upuser_get)
    .get('/delete', yewu.delete_user)
    .post('/upuser', yewu.upuser_post)
    .get('/login', yewu.login_get)
    .post('/login', yewu.login_post);

module.exports = router;