import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_HOST, HEADERS} from "../../config";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        status: '',
        flats: []
    },
    mutations: {
        setFlatsToState(state, flats) {
            state.flats = flats;
        }
    },
    actions: {
        getFlats({commit}) {
            return axios.get(`${API_HOST}/flats/`, {
                    params: {
                        format: 'json',
                    }, headers: HEADERS,
                    method: "GET"
                }
            ).then(flats => {
                commit('setFlatsToState', flats.data);
                return flats;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        }
    },
    getters: {
        flats(state) {
            return state.flats;
        }
    }
})

export default store;
