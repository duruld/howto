import Vuex from 'vuex'
import axios from "axios"

const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            post: []
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
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

        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },

        }
    })
}

export default createStore