<template src='./register.html'>
</template>
<script>
import { queryExec, mysql } from '@/components/database/dbConnection'
import { insertRecord } from '@/components/database/validate'
const storage = require('electron-json-storage')
export default {
  data () {
    return {
      engineerId: '',
      engineerName: '',
      period: '',
      quote: '',
      quotesavailable: [],
      reg: [],
      enquiry: [],
      freq: '',
      menq: '',
      aeng: '',
      email: '',
      cno: '',
      cperson: '',
      pcname: '',
      pdetails: ''
    }
  },
  watch: {
    quote: function () {
      var current = this
      current.quotes()
    },
    reg: function () {
      var current = this
      current.enquiryregister(current.reg)
    },
    enquiry: function () {
      var current = this
      current.overall(current.enquiry)
    }
  },
  methods: {
    updateenqu: function () {
      var current = this
      var query = 'update `projectenquiryregsiter` set `CPerson` = ' + mysql.escape(current.cperson) + ' , `ProDetails` = ' + mysql.escape(current.pdetails) + ' where `RefNo` = ' + mysql.escape(current.reg.refno) + ' and `Revision` = ' + mysql.escape(current.reg.revison)
      console.log(query)
      var value1 = queryExec(query)
      value1.then(function (data) {
        console.log(data)
        current.$router.push({name: 'review', params: {all: current.reg}})
      })
    },
    submit: function () {
      var current = this
      var insertcustomer = {
        Cname: current.pcname,
        PhneNumber: current.cno,
        email: current.email,
        details: current.pdetails,
        CPerson: current.cperson
      }
      var insertCustomer1 = insertRecord('customer', insertcustomer)
      insertCustomer1.then(function (data) {
        console.log('hey')
        current.updateenqu()
      })
    },
    clear () {
      var remote = require('remote')
      remote.getCurrentWindow().reload()
    },
    overall: function (record) {
      var current = this
      var totalval = record
      console.log(totalval)
      current.pdetails = totalval.ProDetails
      current.pcname = totalval.CName
      current.cperson = totalval.CPerson
      current.aeng = totalval.Responsibility
      current.menq = totalval.Mode
      current.freq = totalval.followup
    },
    enquiryregister: function (data) {
      var current = this
      // var query = 'SELECT * FROM `projectenquiryregsiter` WHERE `RefNo` =' + mysql.escape(data.refno) + ' and `Revision` = ' + mysql.escape(data.revison)
      var query = 'SELECT * FROM `projectenquiryregsiter` a, `assignenquiry` b WHERE a.`RefNo` =' + mysql.escape(data.refno) + ' and a.`Revision` = ' + mysql.escape(data.revison) + ' and b.refno = a.RefNo and b.revison = a.Revision '
      console.log(query)
      var value1 = queryExec(query)
      value1.then(function (data) {
        console.log(data)
        current.enquiry = data[0]
        console.log(current.enquiry)
      })
    },
    quotes: function () {
      var current = this
      var query = 'SELECT * FROM `assignenquiry` WHERE `quote` = ' + current.quote + ' and `assgnerId` = ' + mysql.escape(current.engineerId)
      var values = queryExec(query)
      values.then(function (data) {
        console.log(data)
        current.quotesavailable = data
      })
    }
  },
  beforeMount: function () {
    var current = this
    storage.get('login', function (err, data) {
      if (err) throw err
      console.log(data)
      current.engineerId = data.empid
      current.engineerName = data.Name
      current.period = data.period
    })
  }
}
</script>
<style src='./register.css'></style>
