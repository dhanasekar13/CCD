<template src='./generation.html'>
</template>
<script>
export default {
  data () {
    return {
      rows: []
    }
  },
  methods: {
    hit: function () {
      var length = document.getElementsByClassName('a1').length
      for (var i = 0; i < length; i++) {
        document.getElementsByClassName('a1')[i].style.display = 'none'
        document.getElementsByClassName('a2')[i].style.display = 'none'
      }
    },
    addRow: function () {
      // var elem = document.createElement('tr');
      this.rows.push({
        title: '',
        description: '',
        file: {
          name: 'Choose File'
        }
      })
    },
    removeElement: function (index) {
      this.rows.splice(index, 1)
    },
    setFilename: function (event, row) {
      var file = event.target.files[0]
      row.file = file
    }
  }
}
</script>
<style src='./generation.css'></style>
