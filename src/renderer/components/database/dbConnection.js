var mysql = require('mysql')
function connect () {
  var mysql = require('mysql')
  var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'ccd'
  })

  return con
}
// the queries are runned for sample applicaiton
function queryExec (query) {
  return new Promise(function (resolve, reject) {
    var connection = connect()
    connection.connect(function (err) {
      if (err) {
        alert('switch the xampp server ON')
        console.log(err)
      }
    })
    var $query = query
    console.log($query)
    connection.query($query, function (err, rows, fields) {
      if (err) {
        alert('Query NOT Executed||Worked')
        return
      }
      resolve(rows)
    })
  })
}
function insertRecord (tablename, statement) {
  return new Promise(function (resolve, reject) {
    var connection = connect()
    connection.connect(function (err) {
      if (err) {
        alert(err)
      }
    })
    var bind = statement
    var query = 'INSERT INTO ?? set ?'
    connection.query(query, [tablename, bind], function (err, rows, fields) {
      if (err) {
        alert(err)
      }
      resolve('Records inserted successfully')
    })
  })
}
function deletesome (tablename, value) {
  return new Promise(function (resolve, reject) {
    var connection = connect()
    connection.connect(function (err) {
      if (err) {
        alert(err)
      }
    })
    var query = 'DELETE FROM ?? WHERE ? '
    connection.query(query, [tablename, value], function (err, rows, fields) {
      if (err) {
        alert(err)
      }
      resolve('Records inserted successfully')
    })
  })
}
export {
  queryExec,
  connect,
  mysql,
  insertRecord,
  deletesome
}
