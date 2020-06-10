import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_HOST, HEADERS} from "../../config";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        flats: [],
        countFlats: [],
        activeCountFlatsId: null,
        districts: [],
        activeDistrictId: null,
    },

    mutations: {
        setFlatsToState(state, flats) {
            state.flats = flats;
        },

        setCountFlatsToState(state, countFlats) {
            state.countFlats = countFlats;
        },

        setActiveCountFlatsId(state, activeCountFlatsId) {
            state.activeCountFlatsId = activeCountFlatsId;
        },

        setDistrictsToState(state, districts) {
            state.districts = districts;
        },

        setActiveDistrictId(state, activeDistrictId) {
            state.activeDistrictId = activeDistrictId;
        }
    },

    actions: {
        getFlats({commit, state}) {
            return axios.get(`${API_HOST}/flats/`, {
                    params: {
                        flat_type: state.activeCountFlatsId,
                        district: state.activeDistrictId,
                    },
                    headers: HEADERS,
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
        },

        getCountFlats({commit}) {
            return axios.get(`${API_HOST}/flat-types/`, {
                    params: {}, headers: HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setCountFlatsToState', response.data.flat_types);
                return response.flat_types;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getDistricts({commit}) {
            return axios.get(`${API_HOST}/districts/`, {
                    params: {}, headers: HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setDistrictsToState', response.data.districts);
                return response.districts;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },
    },
    getters: {
        flats(state) {
            return state.flats;
        },

        countFlats(state) {
            return state.countFlats;
        },

        activeCountFlatsId(state) {
            return state.activeCountFlatsId;
        },

        districts(state) {
            return state.districts;
        },

        activeDistrictId(state) {
            return state.activeDistrictId;
        },
    }
})

export default store;
