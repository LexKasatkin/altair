<template>
    <v-card
            class="mx-auto"
            max-width="1000">
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
                              :title="flats[(i-1)*3+j-1].address">
                    </FlatCard>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
    import FlatCard from "./FlatCard";
    import axios from "axios";
    import {API_HOST, HEADERS} from "../../../config";

    export default {
        name: "Flats",
        components: {FlatCard},
        data() {
            return {
                flats: [],
                errors: []
            }
        },

        mounted() {

            axios.get(`${API_HOST}/flats/`, {
                params: {
                    format: 'json',
                },
                headers: HEADERS,

            }).then(response => {
                this.flats = response.data
            })
                .catch(e => {
                    this.errors.push(e)
                })
        }
    }
</script>

<style scoped>

</style>
