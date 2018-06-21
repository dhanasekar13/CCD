<template>
  <div id="wrapper">
  <form>

    <label><strong>Employee Id</strong></label>
    <input type="text" v-model="id"><br>
    <label><strong>Password</strong></label>
    <input type="password" v-model="pass"><br>
    <label><strong>Period</strong></label>
    <input type="text" v-model="period"><br>
    <input type="submit" value="submit" v-on:click="submit()">
  </form>
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
