<template>
    <div class="mx-auto main-container">
        <v-card class="mx-auto filters">
            <v-row justify="space-between">
                <v-col class="d-flex" cols="12" sm="3">
                    <v-select :items="countFlats"
                              countFlat
                              label="Количество комнат"
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="3">
                    <v-select :items="districts"
                              district
                              label="Район"
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="3">
                    <v-select :items="developers"
                              developer
                              label="Застройщик"
                    ></v-select>
                </v-col>

                <v-col class="d-flex" cols="12" sm="3">
                    <v-select :items="wallMaterials"
                              label="Материал стен"
                              wallMeterial
                    ></v-select>
                </v-col>
            </v-row>

            <v-row justify="space-between">
                <v-col class="d-flex" cols="12" sm="4">
                    <v-row>
                        <v-col class="d-flex" cols="1" sm="6">
                            <v-text-field
                                    countFrom
                                    label="От"
                                    single-line
                                    v-model="countFrom"
                            ></v-text-field>
                        </v-col>
                        <v-col class="align-center" cols="1" sm="6">
                            <v-text-field
                                    countTo
                                    label="До"
                                    single-line
                                    v-model="countTo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>

                <v-col class="d-flex" cols="12" sm="4">
                    <v-row>
                        <v-col class="d-flex" cols="1" sm="6">
                            <v-text-field
                                    label="От"
                                    single-line
                                    squareFrom
                                    v-model="squareFrom"
                            ></v-text-field>
                        </v-col>
                        <v-col class="d-flex" cols="1" sm="6">
                            <v-text-field
                                    label="До"
                                    single-line
                                    squareTo
                                    v-model="squareTo"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="d-flex" cols="12" sm="4">
                    <v-btn @click="loader = 'loading2'"
                           class="ma-2 justify-end"
                           color="success"
                    >
                        Показать
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>

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
    .filters {
        padding: 16px;
    }
</style>
