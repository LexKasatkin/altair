<template>
    <div class="mx-auto main-container">
        <v-card class="mx-auto filters">
            <v-form
                    @submit.prevent="searchFlats"
                    lazy-validation
                    ref="flatsFilters"
            >
                <v-row justify="space-between">
                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="countFlats"
                                  :value="activeCountFlatsId"
                                  @input="setActiveCountFlatsId"
                                  countFlat
                                  item-text="name"
                                  item-value="id"
                                  label="Количество комнат"
                        ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="districts"
                                  :value="activeDistrictId"
                                  @input="setActiveDistrictId"
                                  district
                                  item-text="name"
                                  item-value="id"
                                  label="Район"
                        ></v-select>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="developers"
                                  :value="activeDeveloperId"
                                  @input="setActiveDeveloperId"
                                  developer
                                  item-text="name"
                                  item-value="id"
                                  label="Застройщик"
                        ></v-select>
                    </v-col>

                    <!--                <v-col class="d-flex" cols="12" sm="3">-->
                    <!--                    <v-select :items="wallMaterials"-->
                    <!--                              label="Материал стен"-->
                    <!--                              wallMeterial-->
                    <!--                    ></v-select>-->
                    <!--                </v-col>-->
                </v-row>

                <v-row justify="space-between">
                    <v-col class="d-flex" cols="12" sm="4">
                        <v-row>
                            <v-col class="d-flex" cols="1" sm="6">
                                <v-text-field
                                        @input="setCostMin"
                                        countFrom
                                        dense
                                        label="От"
                                        outlined
                                        v-model="costMin"
                                ></v-text-field>
                            </v-col>
                            <v-col class="align-center" cols="1" sm="6">
                                <v-text-field
                                        @input="setCostMax"
                                        countTo
                                        dense
                                        label="До"
                                        outlined
                                        v-model="costMax"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="4">
                        <v-row>
                            <v-col class="d-flex" cols="1" sm="6">
                                <v-text-field
                                        @input="setSquareMin"
                                        dense
                                        label="От"
                                        outlined
                                        squareMin
                                        v-model="squareMin"
                                ></v-text-field>
                            </v-col>
                            <v-col class="d-flex" cols="1" sm="6">
                                <v-text-field
                                        @input="setSquareMax"
                                        dense
                                        label="До"
                                        outlined
                                        squareMax
                                        v-model="squareMax"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="4">
                        <v-btn class="ma-2 justify-end"
                               color="success"
                               type="submit"
                        >
                            Показать
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>
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
                              :key="flats[(i-1)*3+j-1].id"
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
    import {mapActions, mapGetters, mapMutations} from 'vuex'

    export default {
        name: "Flats",
        components: {FlatCard},

        data() {
            return {}
        },

        // countFlats: [],
        // districts: [],
        // developers: [],
        // wallMaterials: [],
        // countFrom: '',
        // countTo: '',
        // squareFrom: '',
        // squareFromRules: [
        //     v => parseInt(v.value, 10) <= parseInt(squareTo.value, 10) || 'Площадь должна быть меньше максимальной',
        // ],
        // squareTo: '',
        // squareToRules: [
        //     v => parseInt(v.value, 10) <= parseInt(square.value, 10) || 'Площадь должна быть больше минимальной',
        // ],

        methods: {
            ...mapMutations([
                'setActiveCountFlatsId',
                'setActiveDistrictId',
                'setActiveDeveloperId',
                'setCostMin',
                'setCostMax',
                'setSquareMin',
                'setSquareMax',
            ]),

            ...mapActions([
                'getFlats',
                'getCountFlats',
                'getDistricts',
                'getDevelopers',
            ]),

            text(flat) {
                return `${flat.description}\n${flat.flat_type}\n${flat.realty_type}`
            },

            searchFlats() {
                this.$refs.flatsFilters.validate();
                this.getFlats();
            },
        },

        computed: {
            ...mapGetters([
                'flats',
                'countFlats',
                'activeCountFlatsId',
                'districts',
                'activeDistrictId',
                'developers',
                'activeDeveloperId',
                'costMin',
                'costMax',
                'squareMin',
                'squareMax',
            ])
        },

        mounted() {
            this.getFlats();
            this.getCountFlats();
            this.getDistricts();
            this.getDevelopers();
        }
    }
</script>

<style scoped>
    .filters {
        padding: 16px;
    }
</style>
