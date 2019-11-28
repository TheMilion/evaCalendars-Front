export default function(context){
    let {app} = context;
    var auth = app.store.getters['auth/getAuth']
    var user = app.store.getters['user/getUser']

    if(auth){
        let cookieAuth = app.$cookies.get('auth') 
        if(cookieAuth  == undefined || cookieAuth == ''){
            app.store.commit('auth/setState', {})
                    }
        else{
            app.store.commit('auth/setState', cookieAuth);
        }
    }

    if(user){
        let cookieUser = app.$cookies.get('user') 
        if(cookieUser  == undefined || cookieUser == ''){
            app.store.commit('user/setState', {})
                    }
        else{
            app.store.commit('user/setState', cookieUser);
        }
        
    }
}