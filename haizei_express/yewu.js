var url = require('url');
var db = require('./db');
var formidable = require('formidable');
var querystring = require('querystring');
var fs = require('fs');



module.exports = {
    //登录
    login_get: function (req, res) {
        if (!req.session.session_data) {
            res.render('./login.html', {});
        }
    },
    login_post: function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (fields.user == 'admin' && fields.pwd == '123') {
                req.session.session_data = fields;
                res.redirect('/');
            }
        });
    },
	//获取全部数据
    getall: function (req, res) {
        if (!req.session.session_data) {
            res.redirect('./login');
            return;
        }
        db.select(function (data) {
            res.render('./index.html', {
                data: data
            })
        });
    },
	//获取单个数据
    getone: function (req, res) {
        var urlobj = url.parse(req.url, true);
        db.where('id=' + urlobj.query.id).select(function (data) {
            res.render('./userinfo.html', {
                data: data
            });
        });

    },
	
	
	//修改数据-获得修改数据
    upuser_get: function (req, res) {
        var urlobj = url.parse(req.url, true);
        db.where('id=' + urlobj.query.id).select(function (data) {
            res.render('./upuser.html', {
                data: data
            });
        });
    },

	//根据获得数据，进行删除
    upuser_post: function (req, res) {
        var urlobj = url.parse(req.url, true);
        var form = new formidable.IncomingForm();
        form.uploadDir = './public/img/';
        form.parse(req, (err, fields, files) => {
            var file_path = '/img/' + files.imgs.name;
            fields.img = file_path;
            fs.rename(files.imgs.path, form.uploadDir + files.imgs.name, (err) => {
                db.where('id = ' + urlobj.query.id).update(fields, (data) => {
                    if (data >= 1) {
                        var backstr = "<script>alert('修改成功');window.location.href='/';</script>";
                        res.setHeader('Content-type', 'text/html;charset=utf-8');
                        res.end(backstr);
                    }
                });
            })
        });
    },

	//删除单条数据
    delete_user: function (req, res) {
        var urlobj = url.parse(req.url, true);
        db.where('id=' + urlobj.query.id).delete(function (data) {
            if (data >= 1) {
                var backstr = "<script>alert('删除成功');window.location.href='/';</script>";
                res.setHeader('Content-type', 'text/html;charset=utf-8');
                res.end(backstr);
            }
        });

    }
}




