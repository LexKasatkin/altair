<template>
    <v-app>
        <v-card class="overflow-hidden">
            <v-app-bar
                    absolute
                    color="#01579b"
                    dark
                    fade-img-on-scroll
                    prominent
                    scroll-target="#scrolling-techniques-3"
                    shrink-on-scroll
                    src="@/assets/img/header.jpg"
            >
                <template v-slot:img="{ props }">
                    <v-img gradient="to top right, rgba(13, 71, 161, 0.95), rgba(13, 71, 161, 0.7)"
                           v-bind="props"
                    ></v-img>
                </template>
                <v-spacer/>
                <v-toolbar-title>{{title}}</v-toolbar-title>
                <v-spacer/>

                <!--                <v-btn icon>-->
                <!--                    <v-icon>mdi-magnify</v-icon>-->
                <!--                </v-btn>-->

                <!--                <v-btn icon>-->
                <!--                    <v-icon>mdi-heart</v-icon>-->
                <!--                </v-btn>-->

                <!--                <v-btn icon>-->
                <!--                    <v-icon>mdi-dots-vertical</v-icon>-->
                <!--                </v-btn>-->

                <template v-slot:extension>
                    <Tabs></Tabs>
                </template>
            </v-app-bar>
            <v-sheet
                    class="overflow-y-auto"
                    id="scrolling-techniques-3"
                    max-height="600"
            >
                <v-container style="height: 1000px;">
                    <router-view></router-view>
                </v-container>
            </v-sheet>
        </v-card>
    </v-app>
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
