import Vuex from 'vuex';
import axios from 'axios';
import Cookie from 'js-cookie';

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
            },
            // clearToken(state) {
            //     state.token = null
            // }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return axios.get('https://howto-a9089.firebaseio.com/posts.json')
                    .then(res => {
                        const postArray = []
                        for (const key in res.data) {
                            postArray.push({ ...res.data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postArray)
                    })
            },
            authenticateUser(vuexContext, authData) {
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
                    vuexContext.commit("setToken", result.data.idToken);
                    localStorage.setItem("token", result.data.idToken);
                    localStorage.setItem("tokenExpiration", new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
                    Cookie.set("jwt", result.data.idToken);
                    Cookie.set("expirationDate", new Date().getTime() + Number.parseInt(result.data.expiresIn) * 1000);
                    // return this.axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated!'})
                    console.log(result)
                    
                })
                .catch(e => {
                    console.log(e);
                });
            },
            setLogoutTimer(vuexContext, duration) {
                setTimeout(() => {
                    vuexContext.commit('clearToken')
                }, duration)
            },
            initAuth(vuexContext, req) {
                let token;
                let expirationDate;
                if (req) {
                  if (!req.headers.cookie) {
                    return;
                  }
                  const jwtCookie = req.headers.cookie
                    .split(";")
                    .find(c => c.trim().startsWith("jwt="));
                  if (!jwtCookie) {
                    return;
                  }
                  token = jwtCookie.split("=")[1];
                  expirationDate = req.headers.cookie
                    .split(";")
                    .find(c => c.trim().startsWith("expirationDate="))
                    .split("=")[1];
                } else if (process.client) {
                  token = localStorage.getItem("token");
                  expirationDate = localStorage.getItem("tokenExpiration");
                }
                if (new Date().getTime() > +expirationDate || !token) {
                  console.log("No token or invalid token");
                  vuexContext.dispatch("logout");
                  return;
                }
                vuexContext.commit("setToken", token);
              },

        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }

        }
    })
}

export default createStore