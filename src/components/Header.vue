<template>
    <v-app-bar
            absolute
            color="#01579b"
            dark
            elevation="10"
            fade-img-on-scroll
            prominent
            scroll-target="#scrolling-techniques-3"
            shrink-on-scroll
            src="@/assets/img/header.jpg"
    >
        <template v-slot:img="{ props }">
            <v-img gradient="to top right, rgba(0, 88, 177, 1), rgba(0, 88, 177, 0.85)"
                   v-bind="props"
            ></v-img>
        </template>
        <v-spacer/>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer/>

        <v-switch
                hide-details
                inset
                label="Тёмная тема"
                v-model="$vuetify.theme.dark"
        ></v-switch>
        <template v-slot:extension>
            <Tabs></Tabs>
        </template>
    </v-app-bar>
</template>

<script>
    import Tabs from "./Tabs";

    export default {
        name: "Header",
        components: {Tabs},
        data() {
            return {
                title: 'Альтаир Инвест',
            }
        }
    }
</script>

<style scoped>
</style>
