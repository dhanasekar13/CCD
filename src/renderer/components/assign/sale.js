import { enquiryProject, enquiryTrading } from '@/components/database/validate'
var fs = require('fs-extra')
var sourcefiledir = 'F:/folder/template'
var destinationdir = 'F:/a/'
var multer = require('multer')
function createDir (data, file) {
  return new Promise(function (resolve, reject) {
    var year = ''
    var month = ''
    var date = ''
    var type = ''
    var cname = ''
    var det = ''
    year = data.period
    month = new Date().getMonth()
    if (month < 10) {
      month = '0' + month
    }
    date = new Date().getDate()
    if (date < 10) {
      date = '0' + date
    }
    type = data.ptype
    cname = data.cname
    det = data.detail
    var fullname = destinationdir + year + '' + month + '' + date + '-' + type + '-' + cname + '-' + det
    console.log(fullname)
    fs.copySync(sourcefiledir, fullname)
    resolve(createwin(fullname, file))
  })
}
function type (data) {
  return new Promise(function (resolve, reject) {
    var record = []
    if (data === 'P') {
      var project = enquiryProject()
      project.then(function (data) {
        record = data
        var val = record[record.length - 1].RefNo
        var record1 = val.substring(0, 5)
        var length = parseInt(val.substring(5, 8)) + 1
        if (length < 10) {
          length = '00' + length
        } else if ((length > 100) && (length > 10)) {
          length = '0' + length
        }
        var final = record1 + length
        resolve(final)
      })
    } else if (data === 'S') {
      var trading = enquiryTrading()
      trading.then(function (data) {
        record = data
        var val = record[record.length - 1].RefNo
        var record1 = val.substring(0, 5)
        var length = parseInt(val.substring(5, 8)) + 1
        if (length < 10) {
          length = '00' + length
        } else if ((length > 100) && (length > 10)) {
          length = '0' + length
        }
        var final = record1 + length
        resolve(final)
      })
    }
  })
}
function createwin (dest, file) {
  console.log(dest)
  console.log(file)
  var file1 = dest + '/01. Client/01-Enquiry/'
  var file2 = dest + '/04. Vendor/01-BOM'
  var file3 = dest + '/04. Vendor/02-Pre Order Quotations'
  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, file1)
    }
  })
  var storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, file2)
    }
  })
  var storage2 = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, file3)
    }
  })
  var upload = multer({ storage: storage }).array('originalname')
  var upload1 = multer({ storage: storage1 }).array('originalname')
  var upload2 = multer({ storage: storage2 }).array('originalname')
  upload(file[0], function (err) {
    if (err) {
      return ('error file not uploaded')
    }
  })
  upload1(file[0], function (err) {
    if (err) {
      return ('error file not uploaded')
    }
  })
  upload2(file[0], function (err) {
    if (err) {
      return ('error file not uploaded')
    }
  })
  return 1
}
export {
  createDir,
  type
}
