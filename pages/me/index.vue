<template>
  <div class="" >
    <div class="content-user">
        id: {{user.id}}<br>
        nome: {{user.nome}}<br>
        cognome: {{user.cognome}}<br>
        email: {{user.email}}<br>
        reparto: {{user.reparto}}<br>
        Ruolo: {{user.id_role}}<br>
    </div>
    </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed:{
    user(){
      return this.$store.getters['user/getUser']
    },
    auth(){
      return this.$store.getters['auth/getAuth']
    }
  },

  mounted(){
    if(Object.keys(this.$store.getters['auth/getAuth']).length == 0)this.$router.push("/login")
    else this.getUser()
  },

  data(){
    return {}
  },
  methods:{
    getUser(){
      this.$axios.$get('/me', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
        console.log(data)
        this.$store.commit('user/setState', data)
        console.log(this.$store.getters['user/getUser'])
        //console.log(data)
      })
    }
  }
}
</script>

<style>
.content-user{
  padding:20px;
  margin: 0 auto;
  display: flex;
}
</style>
