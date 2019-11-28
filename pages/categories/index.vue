<template>
  <div class="" >
      <div v-if="user.id_role == 3 || user.id_role == 4">
        <button @click="createGlobalCateogry()">Crea Categoria Globali</button>
      </div>
      <div class="content-user">
        <span v-if="category">
              Categorie: <br>
              <div v-for="(categoria,i) in category" :key="i">
                {{categoria.id}} --{{categoria.nome}}<br>
                <button @click="deleteCategory(categoria.id)">Elimina Categoria</button>
              </div>
            </span>
        <span v-else>
            <span>Nessuna Categoria Trovata</span>
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
    deleteCategory(id){
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
    getCategory(){
      this.$axios.$get('categories', {
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
