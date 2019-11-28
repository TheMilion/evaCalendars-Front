<template>
  <div class="container">
    <div class="login-form">
      <div class="content-form" >
        <form>
          <label >Email:
            <input type="text" class="content-type" v-model="formLogin.email">
          </label>
          
          <label>Password:
            <input type="password" class="content-type" v-model="formLogin.password">
          </label>
          
          <br><button class="btnGo" @click.prevent="login()"> Accedi</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  middleware: 'auth',
  components: {
    Logo
  },
  data(){
    return {
      formLogin:{
        email: "superadmin@eva.it",
        password: "superadmin"
      }
    }
  },
  mounted(){
    console.log("auth: " ,this.$store.getters['auth/getAuth'])
    if(Object.keys(this.$store.getters['auth/getAuth']).length != 0) {
      this.$router.push("/me")
            }
  },
  methods:{

    login(){
      this.$axios.$post('auth/login', {
        email: this.formLogin.email,
        password: this.formLogin.password
      })
      .then( data => {
        console.log(data)
        this.$store.commit('auth/setState', data)
        console.log(this.$store.getters['auth/getauth'])
        this.$router.push("/me")
      })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.login-form{
  width: 900px;
  height: 700px;
  margin: 0 auto;
  display: flex;
  background-color:grey;
}

.content-form{
  padding:20px;
  margin: 0 auto;
  display: flex;

}
.content-type{
  width: 200px;
  height:30px;
  border-radius: 5px;
}
.btnGo{
  margin: 50px;
  width:300px;
  height:40px;
}

</style>
