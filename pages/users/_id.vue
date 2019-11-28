<template>
  <div class="" >
    <div class="content-user">
         id: {{userDetail.id}}<br>
        nome: {{userDetail.nome}}<br>
        cognome: {{userDetail.cognome}}<br>
        email: {{userDetail.email}}<br>
        reparto: {{userDetail.reparto}}<br>
    </div>
    </div>
</template>

<script>
export default {
  middleware: 'auth',
  computed:{
    auth(){
      return this.$store.getters['auth/getAuth']
    }
  },

  mounted(){
    if(Object.keys(this.$store.getters['auth/getAuth']).length == 0)this.$router.push("/login")
    else this.getuserDetails()
  },

  data(){
    return {
        userDetail: {}
    }
  },
  methods:{
    getuserDetails(){
    const id = this.$route.params.id
      this.$axios.$get('users/'+id, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.userDetail = data
      })
      .catch(e => {
          this.userDetail = e
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
