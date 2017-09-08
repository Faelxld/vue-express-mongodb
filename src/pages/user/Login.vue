<template lang="html">
  <div>
    <header-bar></header-bar>

    <div class="form">
      <el-form
        :model="ruleLogin"
        :rules="rules"
        ref="ruleLogin">
        <h1 class="text-center">{{ module_name }}</h1>

        <el-form-item prop="userId">
          <el-input
            type="text"
            v-model.number="ruleLogin.userId"
            name="userId"
            auto-complete="off"
            icon="fa-user"
            placeholder="Enter your ID">
            </el-input>
        </el-form-item>

        <el-form-item prop="userPwd">
          <el-input
            type="password"
            v-model="ruleLogin.userPwd"
            name="userPwd"
            auto-complete="off"
            icon="fa-key"
            placeholder="Enter your password">
            </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="but-faild" type="primary" @click="submitForm('ruleLogin')">{{ module_name }}</el-button>
        </el-form-item>

        <el-alert
          :title="alert_title"
          :type="alert_type"
          :description="alert_description"
          show-icon
          v-if="is_show">
        </el-alert>

        <el-form-item class="text-right">
          <router-link to="reg">Register&nbsp;&nbsp;<i class="el-icon-d-arrow-right"></i></router-link>
        </el-form-item>
      </el-form>

    </div>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import HeaderBar from '@/components/public/HeaderBar'
import FooterBar from '@/components/public/FooterBar'
import api from '@/axios'

export default {
  name: 'Login',
  data () {
    return {
      module_name: 'Login',
      is_show: false,
      alert_title: '',
      alert_description: '',
      alert_type: '',
      ruleLogin: {
        userId: '',
        userPwd: ''
      },
      rules: {
        userId: [
          { required: true, message: 'Plase enter your ID' }
        ],
        userPwd: [
          { required: true, message: 'Plase enter your password', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    HeaderBar,
    FooterBar
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const opt = this.ruleLogin
          api.UserLogin(opt)
            .then(({
              data
            }) => {
              const code = data.code
              if (code === 50) {
                this.alert_type = 'error'
                this.$refs[formName].resetFields()
                setTimeout(() => {
                  this.$router.push({
                    path: 'reg'
                  })
                }, 500)
              } else if (code === 200) {
                this.alert_type = 'success'
                this.$store.dispatch('UserLogin', data.token)
                this.$store.dispatch('UserId', data.userId)
                const redirect = decodeURIComponent(this.$route.query.redirect || '/home')

                setTimeout(() => {
                  this.$router.push({
                    path: redirect
                  })
                }, 1000)
              } else {
                this.alert_type = 'error'
              }
              const msg = data.msg
              const tip = data.tip
              this.alert_title = msg
              this.alert_description = tip
              this.is_show = true
            })
            .catch((err) => {
              console.log(err)
            })
        } else {
          this.alert_type = 'error'
          this.alert_title = 'Error Submit'
          this.alert_description = 'Fill in again'
          this.is_show = true
          return false
        }
      })
    }
  }
}
</script>
