<template>
<div>
  <header-bar></header-bar>
  <h2>Welcome {{ userId }}</h2>
  <el-button type="primary" @click="logout()">登出</el-button>
  <footer-bar></footer-bar>
</div>
</template>

<script>
import HeaderBar from '@/components/public/HeaderBar'
import FooterBar from '@/components/public/FooterBar'

export default {
  name: 'Home',
  data () {
    return {
      userId: ''
    }
  },
  created () {
    this.$api.GetUser().then(({data}) => {
      if (data.code === 401) {
        this.$router.push('/login')
        this.$store.dispatch('UserLogout')
      } else {
        this.userId = sessionStorage.getItem('userId')
      }
    })
  },
  components: {
    HeaderBar,
    FooterBar
  },
  methods: {
    logout () {
      this.$store.dispatch('UserLogout')
      if (!this.$store.state.token) {
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '登出成功'
        })
      } else {
        this.$message({
          type: 'info',
          message: '登出失败'
        })
      }
    }
  }
}
</script>
