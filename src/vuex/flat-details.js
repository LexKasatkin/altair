import axios from "axios";
import {API_HOST, HEADERS} from "../../config";

export const flatDetails = {
    namespaced: true,

    state: {
        flatId: null,
        flat: Object,
        flatDetailsLoaded: false,
    },

    actions: {
        setFlatId({commit}, flatId) {
            commit('setFlatIdToState', flatId)
        },

        getFlat({commit, state}) {
            return axios.get(`${API_HOST}/flats/${state.flatId}`, {
                    headers: HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setFlatToState', response.data);
                commit("setFlatDetailsLoaded", true);
                this.dispatch('loader/setLoading', false);
                return response.data;
            }).catch(error => {
                console.log(error);
                return error;
                }
            )
        },
    },

    mutations: {
        setFlatToState(state, flat) {
            state.flat = flat;
        },

        setFlatIdToState(state, flatId) {
            state.flatId = flatId;
        },

        setFlatDetailsLoaded(state, loaded) {
            state.flatDetailsLoaded = loaded;
        },
    },

    getters: {
        currentFlatId(state) {
            return state.flatId;
        },

        flatDetails(state) {
            return state.flat;
        },

        flatDetailsLoaded(state) {
            return state.flatDetailsLoaded;
        },
    }
};
