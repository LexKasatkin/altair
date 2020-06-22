import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import {API_HOST, HEADERS} from "../../config";
import {loader} from "./loader";
import {flatDetails} from "./flat-details";

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        flats: [],
        countFlats: [],
        activeCountFlatsId: null,
        districts: [],
        activeDistrictId: null,
        developers: [],
        activeDeveloperId: null,
        wallMaterials: [],
        activeWallMaterialId: null,
        costMin: null,
        costMax: null,
        squareMin: null,
        squareMax: null,
        currentFilters: {},

        showMap: false,

        pagesCount: null,
        currentPage: 1,
        limit: 24,
        offset: 0,

        filters: {
            activeWallMaterialId: 'Материал стен',
            activeCountFlatsId: 'Количество комнат',
            activeDistrictId: 'Район',
            activeDeveloperId: 'Застройщик',
            costMin: 'Минимальная стоимость',
            costMax: 'Максимальная стоимость',
            squareMin: 'Минимальная площадь',
            squareMax: 'Максимальная площадь',
        },

        orderings: [
            {title: 'По умолчанию', value: 'cost', icon: 'mdi-sort-ascending'},
            {title: 'По цене, сначала дешевые', value: 'cost', icon: 'mdi-sort-ascending'},
            {title: 'По цене, сначала дорогие', value: '-cost', icon: 'mdi-sort-descending'},
            {title: 'По площади, сначала малые', value: 'square', icon: 'mdi-sort-ascending'},
            {title: 'По площади, сначала большие', value: '-square', icon: 'mdi-sort-descending'},
        ],
        currentOrdering: null,
        markers: [],
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
            if (activeCountFlatsId && !state.currentFilters[state.filters.activeCountFlatsId]) {
                state.currentFilters['activeCountFlatsId'] = state.filters.activeCountFlatsId;
            }
        },

        setDistrictsToState(state, districts) {
            state.districts = districts;
        },

        setActiveDistrictId(state, activeDistrictId) {
            state.activeDistrictId = activeDistrictId;
            if (activeDistrictId && !state.currentFilters[state.filters.activeDistrictId]) {
                state.currentFilters['activeDistrictId'] = state.filters.activeDistrictId;
            }
        },

        setDevelopersToState(state, developers) {
            state.developers = developers;
        },

        setActiveDeveloperId(state, activeDeveloperId) {
            state.activeDeveloperId = activeDeveloperId;
            if (activeDeveloperId && !state.currentFilters[state.filters.activeDeveloperId]) {
                state.currentFilters['activeDeveloperId'] = state.filters.activeDeveloperId;
            }
        },

        setWallMaterialsToState(state, wallMaterials) {
            state.wallMaterials = wallMaterials;
        },

        setActiveWallMaterialId(state, activeWallMaterialId) {
            state.activeWallMaterialId = activeWallMaterialId;
            if (activeWallMaterialId && !state.currentFilters[state.filters.activeWallMaterialId]) {
                state.currentFilters['activeWallMaterialId'] = state.filters.activeWallMaterialId;
            }
        },

        setCostMin(state, costMin) {
            state.costMin = costMin;
            if (costMin && !state.currentFilters[state.filters.costMin]) {
                state.currentFilters['costMin'] = state.filters.costMin;
            }
        },

        setCostMax(state, costMax) {
            state.costMax = costMax;
            if (costMax && !state.currentFilters[state.filters.costMax]) {
                state.currentFilters['costMax'] = state.filters.costMax;
            }
        },

        setSquareMin(state, squareMin) {
            state.squareMin = squareMin;
            if (squareMin && !state.currentFilters[state.filters.squareMin]) {
                state.currentFilters['squareMin'] = state.filters.squareMin;
            }
        },

        setSquareMax(state, squareMax) {
            state.squareMax = squareMax;
            if (squareMax && !state.currentFilters[state.filters.squareMax]) {
                state.currentFilters['squareMax'] = state.filters.squareMax;
            }
        },

        deleteCurrentFilter(state, key) {
            delete state.currentFilters[key];
            state[key] = null;
        },

        resetAllFilters(state) {
            Object.keys(state.currentFilters).forEach(function (key) {
                delete state.currentFilters[key];
            });
            state.squareMin = null;
            state.squareMax = null;
            state.costMin = null;
            state.costMax = null;
            state.activeWallMaterialId = null;
            state.activeDeveloperId = null;
            state.activeDistrictId = null;
            state.activeCountFlatsId = null;
        },

        setPagesCount(state, pagesCount) {
            state.pagesCount = pagesCount;
        },

        setOffset(state, offset) {
            state.offset = offset;
        },

        setLimit(state, limit) {
            state.limit = limit;
        },

        setCurrentPage(state, currentPage) {
            state.currentPage = currentPage;
        },

        setMapShowing(state) {
            state.showMap = !state.showMap;
        },

        setCurrentOrdering(state, currentOrdering) {
            state.currentOrdering = currentOrdering;
        },

        pushMarkers(state, flats) {
            state.markers = flats.map(flat => {
                return {
                    position: [flat.longitude, flat.latitude],
                    content: `${flat.street.district.city.name}, ${flat.street.name} ${flat.house}`
                }
            });
        },
    },

    actions: {
        removeFilter({commit}, key) {
            commit('deleteCurrentFilter', key);
        },

        removeAllFilters({commit}) {
            commit('resetAllFilters')
        },

        getFlats({commit, state}) {
            return axios.get(`${API_HOST}/flats/`, {
                    params: {
                        flat_type: state.activeCountFlatsId,
                        district: state.activeDistrictId,
                        developer: state.activeDeveloperId,
                        cost_min: state.costMin,
                        cost_max: state.costMax,
                        square_min: state.squareMin,
                        square_max: state.squareMax,
                        offset: state.offset,
                        limit: state.limit,
                        ordering: state.currentOrdering,
                    },
                    headers: HEADERS,
                    method: "GET"
                }
            ).then(response => {
                const flats = response.data.results;
                commit('setFlatsToState', flats);
                commit('setPagesCount', Math.ceil(response.data.count / state.limit));
                commit('pushMarkers', flats);
                this.dispatch('loader/setLoading', false);
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
                this.dispatch('loader/setLoading', false);
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
                this.dispatch('loader/setLoading', false);
                return response.districts;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getDevelopers({commit}) {
            return axios.get(`${API_HOST}/developers/`, {
                    params: {}, headers: HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setDevelopersToState', response.data.developers);
                this.dispatch('loader/setLoading', false);
                return response.developers;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        getWallMaterials({commit}) {
            return axios.get(`${API_HOST}/wall-materials/`, {
                    params: {}, headers: HEADERS,
                    method: "GET"
                }
            ).then(response => {
                commit('setWallMaterialsToState', response.data.wall_materials);
                this.dispatch('loader/setLoading', false);
                return response.wall_materials;
            }).catch(error => {
                    console.log(error);
                    return error;
                }
            )
        },

        setLimit({commit}, newLimit) {
            commit('setLimit', newLimit);
        },

        calculateOffset({commit, state}) {
            commit('setOffset', (state.currentPage - 1) * state.limit);
        },

        setCurrentPage({commit}, newPage) {
            commit('setCurrentPage', newPage);
        },

        setMapShowing({commit}) {
            commit('setMapShowing');
        },

        setCurrentOrdering({commit}, currentOrdering) {
            commit('setCurrentOrdering', currentOrdering);
        }
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

        developers(state) {
            return state.developers;
        },

        activeDeveloperId(state) {
            return state.activeDeveloperId;
        },

        wallMaterials(state) {
            return state.wallMaterials;
        },

        activeWallMaterialId(state) {
            return state.activeWallMaterialId;
        },

        costMin(state) {
            return state.costMin;
        },

        costMax(state) {
            return state.costMax;
        },

        squareMin(state) {
            return state.squareMin;
        },

        squareMax(state) {
            return state.squareMax;
        },

        currentFilters(state) {
            return state.currentFilters;
        },

        pagesCount(state) {
            return state.pagesCount;
        },

        currentPage(state) {
            return state.currentPage;
        },

        currentLimit(state) {
            return state.limit;
        },

        showMap(state) {
            return state.showMap;
        },

        currentOrdering(state) {
            return state.currentOrdering;
        },

        orderings(state) {
            return state.orderings;
        },

        markers(state) {
            return state.markers;
        },
    },

    modules: {
        loader,
        flatDetails,
    }
})

export default store;
