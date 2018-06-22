<template src="./assign.html">
</template>

<style src='./assign.css'>
</style>
<script>
import { customer, user, insertRecord } from '@/components/database/validate'
import { createDir, type } from './sale'
const storage = require('electron-json-storage')
export default {
  data () {
    return {
      ptype: '',
      full: {
        period: '',
        customerObj: [],
        engineerName: '',
        engineerId: '',
        cust: '',
        cname: '',
        userObj: [],
        mode: '',
        date1: '',
        follow: '',
        offerno: '',
        ptype: '',
        uname: '',
        detail: '',
        revno: 'R0'
      }
    }
  },
  watch: {
    ptype: function () {
      var current = this
      current.full.ptype = this.ptype
      var vals = type(this.ptype)
      vals.then(function (data) {
        current.full.offerno = data
      })
    }
  },
  methods: {
    clear () {
      var current = this
      current.ptype = ''
      current.full.period = ''
      current.full.customerObj = []
      current.full.engineerName = ''
      current.full.engineerId = ''
      current.full.cust = ''
      current.full.cname = ''
      current.full.userObj = []
      current.full.mode = ''
      current.full.date1 = ''
      current.full.follow = ''
      current.full.offerno = ''
      current.full.ptype = ''
      current.full.uname = ''
      current.full.detail = ''
      current.full.revno = ''
      document.getElementById('client').value = ''
      document.getElementById('boq').value = ''
      document.getElementById('vendor').value = ''
    },
    assign () {
      var file1 = document.getElementById('client').files[0].path
      var file2 = document.getElementById('boq').files[0].path
      var file3 = document.getElementById('vendor').files[0].path
      var current = this
      var file = [file1, file2, file3]
      console.log(current.full)
      var createdre = createDir(current.full, file)
      createdre.then(function (data) {
        alert(data)
        var enquiryregister = {
          Type: current.full.ptype,
          RefNo: current.full.offerno,
          Revision: current.full.revno,
          Responsibility: current.full.uname.Name,
          CName: current.full.cname,
          Mode: current.full.mode,
          EnqDate: new Date().toISOString().substring(0, 10),
          DueDate: current.full.date1
        }
        console.log(enquiryregister)
        var insertedarenot = insertRecord('projectenquiryregsiter', enquiryregister)
        insertedarenot.then(function (data) {
          console.log(data)
        })
        var assignenquirytb = {
          mode: current.full.ptype,
          clientName: current.full.cname,
          duedate: current.full.date1,
          followup: current.full.follow,
          assgnerId: current.full.engineerId,
          assEngineerId: current.full.uname.empid,
          refno: current.full.offerno,
          revison: current.full.revno
        }
        console.log(assignenquirytb)
        var insertedarenot1 = insertRecord('assignenquiry', assignenquirytb)
        insertedarenot1.then(function (data) {
          console.log(data)
          current.clear()
        })
      })
    },
    customer: function () {
      var current = this
      var values = customer()
      values.then(function (data) {
        if (data.length > 0) {
          current.full.customerObj = data
        }
      })
    },
    engineer: function () {
      var current = this
      var engineer = user()
      engineer.then(function (data) {
        if (data.length > 0) {
          current.full.userObj = data
        }
      })
    }
  },
  created: function () {
    var current = this
    storage.get('login', function (err, data) {
      if (err) throw err
      console.log(data)
      current.full.engineerId = data.empid
      current.full.engineerName = data.Name
      current.full.period = data.period
    })
  },
  mounted: function () {
    this.customer()
    this.engineer()
  }
}
</script>
