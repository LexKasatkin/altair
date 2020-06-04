<template>
    <v-tabs
            dark
            fixed-tabs
    >
        <v-tab :key="i" :to="tab.route" v-for="(tab,i) in tabItems">{{tab.name}}
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        name: "Tabs",
        computed: {
            tabItems() {
                return [
                    {
                        name: 'Главная',
                        route: '/main'
                    },
                    {
                        name: 'Компания',
                        route: '/company'
                    },
                    {
                        name: 'Квартиры',
                        route: '/flats'
                    },
                    {
                        name: 'Контакты',
                        route: '/contacts'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
