<template>
  <div class="" >
    <div v-if="user.id_role == 3 || user.id_role == 4">PAGINA NON PER UN ADMIN</div>
    <div v-else>
    <button @click="createEvent()">CREA EVENTO</button>
    <div class="content-user">
      <div v-show="events.partecipate">
        Events a cui parteciperò :  
        <div v-for="(event,i) in events.partecipate" :key="i">
        {{event.id}}
        {{event.title}}
        <button @click="eventDetails(event.id)" align="right">Mosta Dettagli Evento</button>
        </div>
      </div>

      <div v-show="events.creator">
        Events che ho creato :  
        <div v-for="(event,i) in events.creator" :key="i">
        {{event.id}}
        {{event.title}}
        <button @click="eventDetails(event.id)" align="right">Mosta Dettagli Evento</button>
        </div>
      </div>
      </div>
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
        EventForm: {
          title : "Evento Personale",
          id_category : 1,
          id_location : 1,
          date_from : "2019-11-01",
          date_to : "2019-11-01",
          hour_from : "19:30",
          hour_to : "23:00",
        },
        adminUserEventForm: {
          title : "Evento a nome di User",
          id_category : 1,
          id_location : 1,
          date_from : "2019-11-01",
          date_to : "2019-11-01",
          hour_from : "19:30",
          hour_to : "23:00",
          private : 1,
          user : {
            id_user : 2,
            nome: "user",
            cognome: "eva",
            email: "user@eva.it"
          }
        },
        adminPublicEventForm: {
          title : "Evento Pubblico",
          id_category : 1,
          id_location : 1,
          date_from : "2019-11-01",
          date_to : "2019-11-01",
          hour_from : "19:30",
          hour_to : "23:00",
          private : 0,
        },
      partecipantForm : [
          {
            id_user : "3",
            nome : "admin",
            cognome : "eva",
            email : "admin@eva.it",
            stato : 1
          },
          {
            id_user : 0,
            nome : "admina",
            cognome : "admina",
            email : "ciao112@prova.it",
            stato : 1
          }
      ]
    }
  },
  methods:{
    
    createEvent(){
      this.$axios.post('events', this.EventForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
          //add user with partecipants
          const idEvent = data.data.id
          let utenti = this.partecipantForm
          this.$axios.post('events/'+idEvent+'/partecipants', {utenti}, {
            headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + this.auth.token
            }
        }).then( data => {
          this.getEvents()
          })
      })
      .catch(e => {
          console.log(e)
      })
    },
    eventDetails(id){
        this.$router.push('/events/'+id)
      },
    getEvents(){
      this.$axios.$get('me/events', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.events = data
      })
      .catch(e => {
          this.events = e
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
