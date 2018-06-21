import { mysql, queryExec, connect } from '@/components/database/dbConnection'
function assengidvalue (data) {
}
function validate (data1) {
  return new Promise(function (resolve, reject) {
    var query = 'SELECT * FROM `LOGIN` where `empid` = ' + mysql.escape(data1.id) + ' and `password` = ' + mysql.escape(data1.pass)
    var loginvalid = queryExec(query)
    loginvalid.then(function (data) {
      if (data.length > 0) {
        resolve(data)
      }
    })
  })
}
function customer () {
  return new Promise(function (resolve, reject) {
    var query = 'SELECT * FROM `CUSTOMER` where 1'
    var customervalid = queryExec(query)
    customervalid.then(function (data) {
      if (data.length > 0) {
        resolve(data)
      }
    })
  })
}

function assigner (data) {
}

function user () {
  return new Promise(function (resolve, reject) {
    var query = 'SELECT * FROM `LOGIN` where 1'
    var customervalid = queryExec(query)
    customervalid.then(function (data) {
      if (data.length > 0) {
        resolve(data)
      }
    })
  })
}

function assigned (data) {
}
function enquiryProject () {
  return new Promise(function (resolve, reject) {
    var query = 'SELECT * FROM `projectenquiryregsiter` WHERE `Type` = ' + mysql.escape('P')
    var customervalid = queryExec(query)
    customervalid.then(function (data) {
      if (data.length > 0) {
        resolve(data)
      }
    })
  })
}

function enquiryTrading () {
  return new Promise(function (resolve, reject) {
    var query = 'SELECT * FROM `projectenquiryregsiter` WHERE `Type` = ' + mysql.escape('S')
    var customervalid = queryExec(query)
    customervalid.then(function (data) {
      if (data.length > 0) {
        resolve(data)
      }
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
    var query = 'INSERT INTO ?? set ?'
    connection.query(query, [tablename, statement], function (err, rows, fields) {
      if (err) {
        alert(err)
      }
      resolve('RECORDS INSERTED SUCCESSFULLY')
    })
  })
}
export {
  validate,
  assigner,
  customer,
  user,
  assigned,
  enquiryProject,
  assengidvalue,
  enquiryTrading,
  insertRecord
}
