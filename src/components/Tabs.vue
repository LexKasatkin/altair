<template>
    <v-tabs
            dark
            grow
            v-model="activeTab"
    >
        <v-tab :key="i" :tabindex="i" :to="tab.route" v-for="(tab,i) in tabItems">{{tab.name}}
        </v-tab>
    </v-tabs>
</template>

<script>
    export default {
        name: "Tabs",

        data() {
            return {
                activeTab: 2,
                tabItems: [
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
