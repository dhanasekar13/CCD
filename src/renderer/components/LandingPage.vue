<template>

<div id="all">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
  <div id="one" align="center">
<p align='center'><strong>CCD TECHNICAL SALES APPLICATION</strong></p>
  </div>
  <div id="wrapper">
  <form>
  <div class="two">
    <div><label class="font-weight-bold"><strong>Employee Id   -   :</strong></label></div>
    <div><input type="text" class="form-control" v-model="id"></div>
  </div>
<br>
  <div class="two">
    <div><label><strong>Password   -  :</strong></label></div>
    <div><input type="password" class="form-control" v-model="pass"></div>
    </div>
    <br>
    <div class="two">
    <div><label><strong>Period    -   :</strong></label></div>
    <div><input type="text" class="form-control" v-model="period"></div>
    </div>
    <br>
    <div class="two">
    <input class="btn btn-secondary" type="submit" value="SUBMIT" v-on:click="submit()">
    </div>
  </form>
  </div>
  </div>
</template>

<script>
import { validate } from '@/components/database/validate'
import { ipcRenderer } from 'electron'
export default {
  data () {
    return {
      id: '',
      pass: '',
      period: '1819'
    }
  },
  methods: {
    submit () {
      var storage = require('electron-json-storage')
      var current = this
      document.body.innerHTML = ''
      var dat = {
        id: this.id,
        pass: this.pass
      }
      var vals = validate(dat)
      vals.then(function (data) {
        if (data.length > 0) {
          storage.set('login', {'empid': data[0].empid, 'Name': data[0].Name, 'period': current.period}, function (err) {
            if (err) throw err
          })
          ipcRenderer.send('login', 1)
        }
      })
    }
  }
}
</script>
<style>
#one {
margin:2%;
width:100%;
display:inline-block
}
#all {
  width:70%;
  height:50%;
  background:lightgrey;
  margin:12%;
}
.two div {
width:40%;
display:inline-block;
margin:1%
}
div input {
width:100%
}
label {
margin:5%
}
</style>
