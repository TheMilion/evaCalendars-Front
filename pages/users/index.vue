<template>
  <div class="" >
    <div class="content-user">
      <div v-if="user.id_role == 3 || user.id_role == 4">
        <button @click="CreateUser()">Crea Utente</button><br>
        </div>
      
         <span v-if="users.length != 0">
            <div v-for="(user,i) in users" :key="i">
            {{user.id}}
            {{user.nome}}
            <button @click="deleteUser(user.id)">Elimina Utente</button>
            <button @click="userDetails(user.id)" align="right">Mosta Dettagli Utente</button>
            </div>
            </span>
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
    return {
      users: [],
      userCreateForm: {
        nome : "Giuseppe",
	      cognome : "Marinelli",
	      email : "marinelli.giuseppe01@gmail.com",
	      password : "prova",
	      reparto : "it",
	      id_role : 1
      }
    }
  },
  methods:{
    CreateUser(){
      this.$axios.post('users', this.userCreateForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
          console.log(data)
          this.getUser()
      })
      .catch(e => {
          console.log(e)
      })
    },

    deleteUser(id){
    this.$axios.delete('users/'+id , {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
          }
        })
        .then(data => {
          console.log(data)
          this.getUser()
        })
    },
    userDetails(id){
    this.$router.push('/users/'+id)
    },
    getUser(){
      this.$axios.$get('/users', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
        this.users = data
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
