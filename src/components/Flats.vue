<template>
    <div class="mx-auto main-container">
        <v-card-title>Квартиры</v-card-title>

        <v-container class="grey lighten-5">
            <v-row :key="i"
                   justify="start"
                   v-for="i in Math.ceil(flats.length/3)"
            >
                <v-col :key="j"
                       md="4"
                       v-for="j in flats.length - ((i-1)*3)"
                >
                    <FlatCard :image="flats[(i-1)*3+j-1].photo"
                              :message="text(flats[(i-1)*3+j-1])"
                              :title="flats[(i-1)*3+j-1].address">
                    </FlatCard>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import FlatCard from "./FlatCard";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Flats",
        components: {FlatCard},
        data() {
            return {}
        },
        methods: {
            ...mapActions([
                'getFlats'
            ]),
            text(flat) {
                return `${flat.description}\n${flat.flat_type}\n${flat.realty_type}`
            }
        },
        computed: {
            ...mapGetters([
                'flats'
            ])
        },
        mounted() {
            this.getFlats();
        }
    }
</script>

<style scoped>

</style>
