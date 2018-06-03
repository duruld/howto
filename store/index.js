import Vuex from 'vuex'
import axios from "axios"

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            setToken(state, token) {
                state.token = token
            }
        },
        actions: {
            nuxtServerInit(VuexContext, context) {
                return axios.get('https://howto-a9089.firebaseio.com/posts.json')
                    .then(res => {
                        const postArray = []
                        for (const key in res.data) {
                            postArray.push({ ...res.data[key], id: key })
                        }
                        VuexContext.commit('setPosts', postArray)
                    })
            },
            authenticateUser(VuexContext, authData) {
                let authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" + process.env.fbAPI
            
                if (!authData.isLogin) {
                    authUrl = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" + process.env.fbAPI
                }

                axios.post(authUrl ,{
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }
                ).then(result => {
                    VuexContext.commit('setToken', result.data.idToken);
                    console.log(result)
                })
                .catch(e => {
                    console.log(e);
                });
            }

        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },

        }
    })
}

export default createStore