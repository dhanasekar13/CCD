import { enquiryProject, enquiryTrading } from '@/components/database/validate'
var fs = require('fs-extra')
var fileUrl = require('file-url')
var sourcefiledir = 'H:/ccd_technologies/template'
var destinationdir = 'H:/ccd_technologies/project/'
var ncp = require('ncp').ncp
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
    var g1 = file[0]
    var g2 = file[1]
    var g3 = file[2]
    resolve(createwin(fullname, g1, g2, g3))
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
function createwin (dest, file11, file12, file13) {
  return new Promise(function (resolve, reject) {
    var h1 = fileUrl(file11).substring(8)
    var h11 = h1.substring(h1.lastIndexOf('/'))
    var h2 = fileUrl(file12).substring(8)
    var h22 = h2.substring(h2.lastIndexOf('/'))
    var h3 = fileUrl(file13).substring(8)
    var h33 = h3.substring(h3.lastIndexOf('/'))
    var file1 = dest + '/01. Client/01-Enquiry/' + h11
    var file2 = dest + '/04. Vendor/01-BOM/' + h22
    var file3 = dest + '/04. Vendor/02-Pre Order Quotations/' + h33
    console.log('COPYING FILE_____')
    ncp(h1, file1, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    ncp(h2, file2, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    ncp(h3, file3, function (err) {
      if (err) {
        return console.log(err)
      }
    })
    resolve('yes file uploaded successfully')
  })
}
export {
  createDir,
  type
}
