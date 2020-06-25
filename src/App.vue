<template>
    <v-app>
        <div id="app">
            <Header></Header>
            <NavigationDrawer></NavigationDrawer>
            <notifications group="errors" position="bottom right"/>
            <ProgressDialog :visibility="loading"></ProgressDialog>
            <div>
                <v-sheet
                        class="overflow-y-auto"
                        id="scrolling-techniques-3"
                >
                    <v-content :class="[bigMargin ? 'content-margin-big' : 'content-margin'  ]">
                        <router-view></router-view>
                    </v-content>
                </v-sheet>
            </div>
        </div>
    </v-app>
</template>

<script>
    import Header from "./components/Header";
    import axios from "axios";
    import {mapActions, mapGetters} from "vuex";
    import ProgressDialog from "./components/ProgressDialog";
    import NavigationDrawer from "./components/NavigationDrawer";

    export default {
        components: {Header, ProgressDialog, NavigationDrawer},

        created() {
            axios.interceptors.request.use((config) => {
                this.setLoading(true);
                return config;
            }, (error) => {
                this.setLoading(false);
                this.showErrorMessage(error.message)
                return Promise.reject(error);
            });

            axios.interceptors.response.use((response) => {
                this.setLoading(false);
                return response;
            }, (error) => {
                this.setLoading(false);
                this.showErrorMessage(error.message)
                return Promise.reject(error);
            });
        },

        methods: {
            ...mapActions('loader', [
                'setLoading',
            ]),

            showErrorMessage(message) {
                this.$notify({
                    group: 'errors',
                    text: message,
                    type: 'error',
                });
            }
        },

        computed: {
            ...mapGetters('loader', [
                'loading',
            ]),

            bigMargin() {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs':
                        return false
                    case 'sm':
                        return false
                    case 'md':
                        return true
                    case 'lg':
                        return true
                    case 'xl':
                        return true
                    default:
                        return true
                }
            },
        }
    }
</script>


<style>
    @import "~leaflet.markercluster/dist/MarkerCluster.css";
    @import "~leaflet.markercluster/dist/MarkerCluster.Default.css";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .main-container {
        max-width: 984px;
    }

    .content-margin-big {
        margin-top: 250px;
    }

    .content-margin {
        margin-top: 150px;
    }


    .color-text {
        color: #1976D2;
    }
</style>
