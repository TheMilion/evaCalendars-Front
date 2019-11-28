<template>
  <div class="" >
     <div v-if="user.id_role == 4 || user.id_role == 3">
          Sei un Admin<br>
          <button @click="addToLocation(location.id)">Aggiungi Utenti</button>
          <button @click="deleteToLocation(location.id)">Rimuovi Utenti</button>
      </div><br>
    <div class="content-user">
        <span v-if="location">
        Nome Gruppo : {{location.nome}}<br><br> 
        Lista utenti : <br><br>
        <div v-if="location.partecipants">
            <div v-for="(utente,i) in location.partecipants" :key="i">
                id : {{utente.member.id}}<br>
                nome : {{utente.member.nome}}<br>
                cognome : {{utente.member.cognome}}<br>
                email : {{utente.member.email}}<br>
                reparto : {{utente.member.reparto}}<br>
                <button @click="userDetails(utente.member.id)" align="right">Mosta Dettagli Utente</button>
            </div>
        </div>
        </span>
        <span v-else>
            <span>Nessun Gruppo Trovato</span>
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
    else this.getLocations()
  },

  data(){
    return {
        location: {},
        formAddToLocation : [1,2,3,4]
    }
  },
  methods:{
    userDetails(id){
    this.$router.push('/users/'+id)
    },
    addToLocation(id_location){
      let token = this.auth.token
      this.$axios.$post('locations/'+id_location+'/users', {"id_users" : this.formAddToLocation}, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
      })
      .then( data => {
          this.getLocations()
      })
      .catch(e => {
          console.log(e)
      })
    },

    deleteToLocation(id_location){
      let token = this.auth.token
      this.$axios.$delete('locations/'+id_location+'/users',{
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      data: {
          "id_users" : this.formAddToLocation
      }
      })
      .then( data => {
          this.getLocations()
      })
      .catch(e => {
          console.log(e)
      })
    },

    getLocations(){
    const id_location = this.$route.params.id
      this.$axios.$get('locations/'+id_location, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.location = data[0]
      })
      .catch(e => {
          console.log(e)
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
