<template>
    <v-card>
        <v-card-title class="headline">Use Google's location service?</v-card-title>

        <v-card-text>
            Let Google help apps determine location. This means sending anonymous location data to Google, even when
            no apps are running.
        </v-card-text>

    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "FlatDetails",

        props: {
            flatId: {
                type: Number,
            },
        },

        methods: {
            ...mapActions('flatDetails', []),
        },

        computed: {
            ...mapGetters('flatDetails', []),
        },
    }
</script>

<style scoped>

</style>
