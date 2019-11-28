<template>
  <div class="" >
    <div v-if="user.id_role == 3 || user.id_role == 4">PAGINA NON PER UN ADMIN</div>
    <div v-else>
      <button @click="createPersonalCategory()">Crea Categoria Personali</button>
    
      <div class="content-user">
        <span v-if="category">
            <span v-if="category.personali">
              Categorie Personali: <br>
              <div v-for="(category,i) in category.personali" :key="i">
                {{category.id}} --{{category.nome}}<br>
                <button @click="deleteCategoryUser(category.id)">Elimina Categoria</button>
              </div>
            </span>
            <span v-if="category.globali">
              Categorie Globali: <br>
              <div v-for="(category,i) in category.globali" :key="i">
                {{category.id}} --{{category.nome}}<br>
                
              </div>
            </span>
        </span>
        <span v-else>
            <span>Nessuna Categoria Trovata</span>
        </span>
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
    else this.getCategory()
  },

  data(){
    return {
        category: {},
        categoryForm: {
          nome : "Ciao"
        },
        categoryGlobalForm : {
          nome : "Globale"
        }
    }
  },
  methods:{
    deleteCategoryUser(id){
      this.$axios.delete('categories/'+id , {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
          }
        })
        .then(data => {
          console.log(data)
          this.getCategory()
        })
      },
    createGlobalCateogry(){
      this.$axios.post('categories', this.categoryGlobalForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
          console.log(data)
          this.getCategory()
      })
      .catch(e => {
          console.log(e)
      })
    },
    createPersonalCategory(){
      this.$axios.post('categories', this.categoryForm, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.auth.token
      }
      })
      .then( data => {
          console.log(data)
          this.getCategory()
      })
      .catch(e => {
          console.log(e)
      })
    },
    getCategory(){
      this.$axios.$get('me/categories', {
        headers: {'Authorization': "bearer " + this.auth.token}
      })
      .then( data => {
          this.category = data
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
