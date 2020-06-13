export const loader = {
    namespaced: true,
    state: {
        loading: false,
        refCount: 0,
    },
    actions: {
        setLoading({commit, state}, isLoading) {
            if (isLoading) {
                commit('incrementCount');
                commit('show');
            } else if (state.refCount > 0) {
                commit('decrementCount');
                if (state.refCount === 0) {
                    commit('hide');
                }
            }
        }
    },
    mutations: {
        show(state) {
            state.loading = true;
        },

        hide(state) {
            state.loading = false;
        },

        incrementCount(state) {
            state.refCount++;
        },

        decrementCount(state) {
            state.refCount--;
        },
    },
    getters: {
        loading(state) {
            return state.loading;
        },
    }
};
