<template>
    <v-content>
        <v-app-bar
                absolute
                color="#1976D2"
                dark
                elevation="10"
                fade-img-on-scroll
                prominent
                scroll-target="#scrolling-techniques-3"
                shrink-on-scroll
                src="@/assets/img/header.jpg"
        >
            <template v-slot:img="{ props }">
                <v-img gradient="to top right, rgba(25, 118, 210, 1), rgba(25, 118, 210, 0.85)"
                       v-bind="props"
                ></v-img>
            </template>
            <v-app-bar-nav-icon @click.stop="setDrawer"></v-app-bar-nav-icon>
            <v-spacer/>
            <v-toolbar-title>{{title}}</v-toolbar-title>
            <v-spacer/>

            <template v-if="showTabs" v-slot:extension>
                <Tabs></Tabs>
            </template>
        </v-app-bar>
    </v-content>
</template>

<script>
    import Tabs from "./Tabs";
    import {mapActions} from "vuex";

    export default {
        name: "Header",
        components: {Tabs},
        data() {
            return {
                title: 'Альтаир Инвест',
                drawer: false,
            }
        },

        methods: {
            ...mapActions('drawer', [
                'setDrawer',
            ]),
        },

        computed: {
            showTabs() {
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

<style scoped>
</style>
