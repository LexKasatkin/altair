import axios from "axios";
import {API_HOST, HEADERS} from "../../config";

export const flatDetails = {
    namespaced: true,

    state: {
        flatId: null,
        flat: Object,
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
    },

    getters: {
        currentFlatId(state) {
            return state.flatId;
        },

        flat(state) {
            return state.flat;
        },
    }
};
