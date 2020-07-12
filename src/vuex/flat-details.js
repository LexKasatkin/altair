import axios from "axios";
import {API_HOST, HEADERS, MEDIA_HOST} from "../../config";

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
                const flat = response.data;
                commit('setFlatToState', flat);
                commit("setFlatDetailsLoaded", true);
                this.dispatch('loader/setLoading', false);
                const images = [flat.main_image, flat.layout]
                    .filter(src => {
                        if (src) return src;
                    }).map(source => !source ? null : `${MEDIA_HOST}${source}`);
                this.dispatch('galleryImages/setImages', images);
                return flat;
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
