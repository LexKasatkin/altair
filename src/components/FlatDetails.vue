<template>
    <v-card>
        <v-card-title class="headline">{{formattedCost}}</v-card-title>

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

        mounted() {
            this.setFlatId(this.$route.params.flatId);
            this.getFlat();
        },

        methods: {
            ...mapActions('flatDetails', [
                'setFlatId',
                'getFlat'
            ]),
        },

        computed: {
            ...mapGetters('flatDetails', [
                'flat',
                'currentFlatId',
            ]),

            formattedSquareCost() {
                return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})
                    .format(Math.round(this.flat.cost / this.flat.square));
            },

            formattedCost() {
                return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})
                    .format(Math.round(this.flat.cost));
            },
        },
    }
</script>

<style scoped>

</style>
