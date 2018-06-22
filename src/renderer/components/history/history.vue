<template src='./history.html'>
</template>

<script>
import { queryExec, mysql } from '@/components/database/dbConnection'
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
