<template src='./review.html'>
</template>
<script>

export default {
  data () {
    return {
      sel: 0,
      app: 0
    }
  },
  methods: {
    pdf: function () {
      document.getElementsByClassName('hide')[0].style.display = 'none'
      console.log(print())
    }
  }
}
</script>
<style src='./review.css'>

</style>
