export const state = () => ({
    auth: {},
})
  export const getters = {
    getAuth(state){
      return state.auth
    }
  }
  export const mutations = {
    setState(state,obj){
           state.auth = obj
           this.$cookies.set("auth", state.auth); 
    }
  }
  export const actions = {
      setState(e,string){
        e.commit('setState',string)
      }
}
