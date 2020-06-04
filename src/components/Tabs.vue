<template>
    <v-tabs
            dark
            fixed-tabs
    >
        <v-tab :key="i" :to="tab.navigateTo" v-for="(tab,i) in tabItems">{{tab.name}}
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
                        navigateTo: '/main'
                    },
                    {
                        name: 'Компания',
                        navigateTo: '/company'
                    },
                    {
                        name: 'Квартиры',
                        navigateTo: '/flats'
                    },
                    {
                        name: 'Контакты',
                        navigateTo: '/contacts'
                    },
                ]
            }
        }
    }
</script>

<style scoped>

</style>
