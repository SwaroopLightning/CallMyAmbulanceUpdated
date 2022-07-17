const mysql = require("mysql2");

const config = require("../backendConfig");

var pool = mysql.createPool(config.mysql.prod);

function executeQuery(sql, data, callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      callback(err);
    } else {
      console.log("Connection Established Successfully");
      connection.query(sql, data, function (err1, result) {
        if (err1) {
          callback(err1);
        } else {
          console.log("Query Executed Succeessfully", result);
          connection.release();
          callback(err1, result);
        }
      });
    }
  });
}

module.exports = { executeQuery };
