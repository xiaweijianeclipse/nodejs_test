var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mynodejs'
});
connection.connect();

module.exports = {
    wh: '',
    where: function (wh) {
        this.wh = wh;
        return this;
    },
	//查询
    select: function (callback) {
        if (!this.wh) {
            var sql = "select * from users";
        } else {
            var sql = "select * from users where " + this.wh;
        }
        connection.query(sql, function (err, data) {
            var sql_data = data;
            callback(sql_data);
        });

        this.wh = undefined;
    },
	//更新
    update: function (data, callback) {
        var set = '';
        for (var key in data) {
            set += key + "='" + data[key] + "',";
        }
        var sql = set.slice(0, set.length - 1);
        sql = "update users set " + sql + " where " + this.wh;
        connection.query(sql, function (err, data) {
            console.log(data);
            callback(data.changedRows);
        });
        this.wh = undefined;
    },
	//删除
    delete: function (callback) {
        if (this.wh) {
            var sql = "delete from users where " + this.wh;
            connection.query(sql, function (err, data) {
                console.log(data);
                callback(data.affectedRows);
            });
        }
        this.wh = undefined;
    }

}