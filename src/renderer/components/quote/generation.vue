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
      console.log('hey')
      document.getElementsByClassName('remove').base.style.display = 'none'
      console.log(print())
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
