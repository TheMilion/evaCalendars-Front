<template>
  <div class="" >

    <div class="content-user">
        <span v-if="events">
          <span v-if="events.creator">
  <div v-if="user.id_role == 3 || user.id_role == 4">
    Gestisci Evento:
    <button @click="deleteEvent(events.id)">Elimina Evento</button>
    <button @click="modifyEvent(events.id)">Modifica Evento</button>
    <button @click="addPartecipantEvent(events.id)">Aggiungi Partecipanti Evento</button>
    <button @click="DeletePartecipantEvent(events.id)">Rimuovi Partecipanti Evento</button>
    </div>
    </span>
        Event Title : {{events.title}}<br><br>
        Event Id : {{events.id}}<br><br>
        Data inizio : {{events.date_from}}<br><br>
        Data Fine : {{events.date_to}}<br><br>
        Ora Inizio : {{events.hour_from}}<br><br>
        Ora Fine: {{events.hour_to}}<br><br>
        Dettagli Evento: {{events.note}}<br><br>
        Event Privato : {{events.private}}<br><br>
        
        <div v-if="events.category">
          Categoria : {{events.category.nome}}<br><br>
        </div>
        <div v-else>
          Nessuna Categoria scelta <br><br>
        </div>

        <div v-if="events.location">
        Location : <br>
        Nome : {{events.location.nome}}<br>
        Indirizzo : {{events.location.indirizzo}}<br>
        Contatti : {{events.location.contatti}}<br><br>
        </div>
        <div v-else>
          Nessuna Location scelta <br>
        </div>
        Lista Partecipanti : <br><br>
        <div v-for="(utente,i) in events.partecipants" :key="i">
            <div v-if="utente.id_user == 0">
              Ospite<br>
              Nome : {{utente.nome}}<br>
              Cognome : {{utente.cognome}}<br>
              Email : {{utente.email}}<br><br>
            </div>
            <div v-else>
            <span v-if="utente.isOwner == 1">
              <span v-if="utente.id_user == user.id">
               You Are Owner, Gestisci evento
                <button @click="deleteEvent(events.id)">Elimina Evento</button>
                <button @click="modifyEvent(events.id)">Modifica Evento</button>
                <button @click="addPartecipantEvent(events.id)">Aggiungi Partecipanti Evento</button>
                <button @click="DeletePartecipantEvent(events.id)">Rimuovi Partecipanti Evento</button>
              </span>
            </span><br>
              Id User: {{utente.id_user}}<br>
              Nome : {{utente.nome}}<br>
              Cognome : {{utente.cognome}}<br>
              Email : {{utente.email}}<br>
              Owner : {{utente.isOwner}}<br><br>
              
            </div>
          </div>

       
        <div v-if="events.creator">
        Creatore : <br>
          Id User: {{events.creator.id}}<br>
          Nome : {{events.creator.nome}}<br>
          Cognome : {{events.creator.cognome}}<br>
          Email : {{events.creator.email}}<br><br>
        </div>
        </span>
        <span v-else>
            <span>Nessun Evento Trovato</span>
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
    else this.getEvents()
  },

  data(){
    return {
        events: {},
        imOwner: false,
        updateEvent: {
          "title" : "Modifica Evento Effettuata",
          "id_category" : 1,
          "id_location" : 1,
          "date_from" : "2019-12-05",
          "date_to" : "2019-12-06",
          "hour_from" : "13:30",
          "hour_to" : "20:00",
          "private" : 1
        },
        partecipantForm : [
          {
            id_user : 0,
            nome : "admina",
            cognome : "admina",
            email : "ciao112@prova.it",
            stato : 1
          },
          {
            id_user : 0,
            nome : "peppino",
            cognome : "admina",
            email : "peppino@peppino.it",
            stato : 1
          },
          {
            id_user : 0,
            nome : "peppino",
            cognome : "admina",
            email : "peppino2@peppino.it",
            stato : 1
          },
      ]
    }
  },
  methods:{
    deleteEvent(id){
      this.$axios.$delete('events/'+id, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
        console.log(data)
        this.$router.push('/me/events')
      })
      .catch(e => {
        console.log(e)
      })
    },
    addPartecipantEvent(id){
      let utenti = this.partecipantForm
          this.$axios.post('events/'+id+'/partecipants', {utenti}, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.auth.token
            }
        })
        .then( data => {
          console.log(data)
          this.getEvents()
      })
      .catch(e => {
          console.log(e)
      })
    },
    DeletePartecipantEvent(id){
      this.$axios.delete('events/'+id+'/partecipants',{
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
        },
        data: {
          "utenti" : this.partecipantForm
        }
      })
      .then( data => {
      this.getEvents()
      })
      .catch(e => {
      console.log(e)
      })
    },
    modifyEvent(id){
      this.$axios.$patch('events/'+id, {...this.updateEvent,id_creator: this.user.id}, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
        console.log(data)
        this.getEvents()
      })
      .catch(e => {
        console.log(e)
      })
    },
    groupDetails(id){
        this.$router.push('/events/'+id)
      },
    getEvents(){
    const id = this.$route.params.id
      this.$axios.$get('events/'+id, {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
        
          this.events = data[0]
      })
      .catch(e => {
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
