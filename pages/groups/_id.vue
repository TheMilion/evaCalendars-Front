<template>
  <div class="" >
     <div v-if="user.id_role == 4 || user.id_role == 3">
          Sei un Admin Aggiungi Persone a Questo Gruppo<br>
          <button @click="addToGroup(groups.id)">Aggiungi Utenti</button>
          <button @click="deleteToGroup(groups.id)">Rimuovi Utenti</button>
      </div><br>
    <div class="content-user">
        <span v-if="groups">
        Nome Gruppo : {{groups.nome}}<br><br> 
        Lista utenti : <br><br>
            <div v-for="(utente,i) in groups.partecipants" :key="i">
                id : {{utente.member.id}}<br>
                nome : {{utente.member.nome}}<br>
                cognome : {{utente.member.cognome}}<br>
                email : {{utente.member.email}}<br>
                reparto : {{utente.member.reparto}}<br>
                manager : {{utente.manager}}<br>
                <button @click="userDetails(utente.member.id)" align="right">Mosta Dettagli Utente</button>
            <div v-if="user.id == utente.member.id && utente.manager == 1">
            Sei Il manager del Gruppo<br>
            <button @click="addToGroup(groups.id)">Aggiungi Utenti</button>
            <button @click="deleteToGroup(groups.id)">Rimuovi Utenti</button>
            </div><br>
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
    else this.getGroups()
  },

  data(){
    return {
        groups: {},
        formAddToGroup : [1,2],
    }
  },
  methods:{
    userDetails(id){
    this.$router.push('/users/'+id)
    },
    groupDetails(id){
        this.$router.push('/groups/'+id)
      },
    
    addToGroup(id_group){
      let token = this.auth.token
      this.$axios.$post('groups/'+id_group+'/member', {"id_users" : this.formAddToGroup}, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      }
      })
      .then( data => {
        console.log(data)
          this.getGroups()
      })
      .catch(e => {
          console.log(e)
      })
    },

    deleteToGroup(id_group){
      let token = this.auth.token
      this.$axios.delete('groups/'+id_group+'/member', {
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token
      },
      data: {"id_users" : this.formAddToGroup}
      })
      .then( data => {
        console.log(data)
          this.getGroups()
      })
      .catch(e => {
          console.log(e)
      })
    },

    getGroups(){
    const id = this.$route.params.id
      this.$axios.$get('groups/'+id, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.groups = data[0]
      })
      .catch(e => {
          this.groups = e
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
