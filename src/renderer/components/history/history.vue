<template src='./history.html'>
</template>

<script>
import { queryExec, mysql, insertRecord } from '@/components/database/dbConnection'
const storage = require('electron-json-storage')
export default {
  data () {
    return {
      gridColumns: ['mode', 'Quotation Reference Number', 'Revision number', 'clientName', 'duedate', 'followup', 'assgnerId', 'assEngineerId', 'QUOTE'],
      company: '',
      currentrecord: '',
      customerRec: [],
      companydetails: '',
      currentSort: 'DESCR',
      currentSortDir: 'asc',
      pageSize: 50,
      currentPage: 1,
      searchQuery: '',
      sortKey: '',
      engineerId: '',
      period: '',
      sortOrders: function () {
        this.customerRec.forEach(function (key) {
          this.sortOrders[key] = 1
        })
      }
    }
  },
  methods: {
    nextPage: function () {
      var current = this
      if ((current.currentPage * current.pageSize) < current.customerRec.length) current.currentPage++
    },
    prevPage: function () {
      var current = this
      if (current.currentPage > 1) current.currentPage--
    },
    hit (data) {
      var current = this
      if (data.quote === 0) {
        current.currentrecord = 'quoted '
      } else {
        current.currentrecord = ' not quoted'
      }
      console.log(current.currentrecord)
    },
    call: function (data) {
      console.log(data)
      var current = this
      var query = 'SELECT * FROM `assignenquiry` a, `projectenquiryregsiter` p WHERE a.refno = ' + mysql.escape(data.refno) + ' and a.refno = p.RefNo'
      console.log(query)
      var values = queryExec(query)
      values.then(function (data) {
        console.log(data)
        if (data.length === 1) {
          current.createquote(data)
        } else if (data.length > 1) {
          current.createquote1(data)
        }
      })
    },
    update: function (data) {
      console.log(data)
      console.log(data.revison)
      var query = 'update `assignenquiry` set `quote` = 1  where refno = ' + mysql.escape(data.refno) + ' and revison = ' + mysql.escape(data.revison)
      console.log(query)
      var values = queryExec(query)
      values.then(function (data) {
        alert('refresh the page to work the changes')
      })
    },
    insertrevision: function (data, data1) {
      var fulldetail = data
      var current = this
      var enquiryregister = {
        Type: data.Type,
        RefNo: data.RefNo,
        Revision: data1,
        Responsibility: data.Responsibility,
        CName: data.CName,
        Mode: data.Mode,
        EnqDate: data.EnqDate,
        DueDate: data.DueDate
      }
      console.log(enquiryregister)
      var insertedarenot = insertRecord('projectenquiryregsiter', enquiryregister)
      insertedarenot.then(function (data) {
        console.log(data)
        current.update(fulldetail)
      })
      var assignenquirytb = {
        mode: data.mode,
        clientName: data.clientName,
        duedate: data.duedate,
        followup: data.followup,
        assgnerId: data.assgnerId,
        assEngineerId: data.assEngineerId,
        refno: data.refno,
        revison: data1
      }
      console.log(assignenquirytb)
      var insertedarenot1 = insertRecord('assignenquiry', assignenquirytb)
      insertedarenot1.then(function (data) {
        console.log(data)
        current.update(fulldetail)
      })
    },
    createquote (data) {
      console.log(data)
      var current = this
      var r = 'R' + (parseInt(data[data.length - 1].revison.substring(1)) + 1)
      console.log(r)
      console.log('created revisoin for 1 record ' + r)
      current.insertrevision(data[data.length - 1], r)
    },
    createquote1 (data) {
      var current = this
      console.log('created revision for more record')
      var r = 'R' + (parseInt(data[data.length - 1].revison.substring(1)) + 1)
      console.log(r)
      current.insertrevision(data[data.length - 1], r)
    },
    onload: function () {
      var current = this
      var query = 'SELECT * FROM `assignenquiry` WHERE `assgnerId` = ' + mysql.escape(current.engineerId) + ' or `assEngineerId` = ' + mysql.escape(current.engineerId)
      var value = queryExec(query)
      value.then(function (data) {
        for (var i = 0; i < data.length; i++) {
          current.customerRec.push(data[i])
        }
        console.log(current.customerRec)
      })
    },
    sort: function (s) {
      var current = this
      if (s === current.currentSort) {
        current.currentSortDir = current.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      current.currentSort = s
    }
  },
  computed: {
    sortedCats: function () {
      var current = this
      return current.customerRec.filter((post) => {
        return post.clientName.toString().toLowerCase().includes(current.searchQuery)
      }).sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[current.currentSort] < b[current.currentSort]) return -1 * modifier
        if (a[current.currentSort] > b[current.currentSort]) return -1 * modifier
        return 0
      }).filter((row, index) => {
        let start = (current.currentPage - 1) * this.pageSize
        let end = current.currentPage * this.pageSize
        if (index >= start && index < end) return true
      })
    }
  },
  beforeMount () {
    var current = this
    storage.get('login', function (err, data) {
      if (err) throw err
      console.log(data)
      current.engineerId = data.empid
      current.period = data.period
      current.onload()
    })
  },
  mounted () {
  }
}
</script>
