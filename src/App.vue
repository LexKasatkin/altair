<template>
    <v-app>
        <div id="app">
            <Header></Header>

            <div>
                <v-card class="overflow-hidden">
                    <v-sheet
                            class="overflow-y-auto"
                            id="scrolling-techniques-3"
                    >
                        <v-container style="height: 1000px; margin-top: 250px">
                            <router-view></router-view>
                        </v-container>
                    </v-sheet>
                </v-card>
            </div>
        </div>
    </v-app>
</template>

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

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    .main-container {
        width: 900px;
    }
</style>
<script>
    import Header from "./components/Header";

    export default {
        components: {Header}
    }
</script>
