<template>
    <v-app>
        <div id="app">
            <Header></Header>
            <notifications group="errors" position="bottom right"/>
            <ProgressDialog :visibility="loading"></ProgressDialog>
            <div>
                <v-sheet
                        class="overflow-y-auto"
                        id="scrolling-techniques-3"
                >
                    <v-container class="content-margin">
                        <router-view></router-view>
                    </v-container>
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

    export default {
        components: {Header, ProgressDialog},

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
        }
    }
</script>


<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    #nav {
        padding: 30px;
    }

    .content-margin {
        margin-top: 250px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    .main-container {
        max-width: 984px;
    }

</style>
