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

                    <v-col class="d-flex" cols="12" sm="3">
                        <v-select :items="wallMaterials"
                                  :value="activeWallMaterialId"
                                  @input="setActiveWallMaterialId"
                                  item-text="name"
                                  item-value="id"
                                  label="Материал стен"
                                  wallMeterial
                        ></v-select>
                    </v-col>
                </v-row>

                <v-row justify="space-between">
                    <v-col class="d-flex" cols="12" sm="5">
                        <v-row>
                            <v-col class="d-flex" cols="4" sm="3">
                                Стоимость:
                            </v-col>
                            <v-col class="d-flex" cols="4" sm="4">
                                <v-text-field
                                        @input="setCostMin"
                                        countFrom
                                        dense
                                        :rules="[value => {if(!costMax || value <= costMax) return true
                                        else {return 'Минимальная стоимость должна быть меньше максимальной.'}}]"
                                        label="От"
                                        type="number"
                                        outlined
                                        v-model.number="costMin"
                                ></v-text-field>
                            </v-col>
                            <v-col class="align-center" cols="4" sm="4">
                                <v-text-field
                                        @input="setCostMax"
                                        countTo
                                        dense
                                        :rules="[value => {if(!costMin || value >= costMin) return true
                                        else {return  'Максимальная стоимость должна быть больше минимальной.'}}]"
                                        type="number"
                                        label="До"
                                        outlined
                                        v-model.number="costMax"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col class="d-flex" cols="12" sm="5">
                        <v-row>
                            <v-col class="d-flex" cols="4" sm="3">
                                Площадь:
                            </v-col>
                            <v-col class="d-flex" cols="4" sm="4">
                                <v-text-field
                                        @input="setSquareMin"
                                        dense
                                        label="От"
                                        :rules="[value => {if(!squareMax || value <= squareMax) return true
                                        else {return 'Минимальная площадь должна быть меньше максимальной.'}}]"
                                        type="number"
                                        outlined
                                        squareMin
                                        v-model.number="squareMin"
                                ></v-text-field>
                            </v-col>
                            <v-col class="d-flex" cols="4" sm="4">
                                <v-text-field
                                        @input="setSquareMax"
                                        dense
                                        label="До"
                                        :rules="[value => {if(!squareMin || value >= squareMin) return true
                                        else {return  'Максимальная площадь должна быть больше минимальной.'}}]"
                                        type="number"
                                        outlined
                                        squareMax
                                        v-model.number="squareMax"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="2">
                        <v-btn class="ma-2 justify-end"
                               color="success"
                               type="submit"
                        >
                            Показать
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row
                        align="center"
                        justify="start"
                >
                    <v-col :key="filter"
                           class="shrink"
                           v-for="filter in Object.keys(currentFilters)"
                    >
                        <v-chip @click:close="removeFilter(filter)"
                                close
                        >
                            {{ currentFilters[filter] }}
                        </v-chip>
                    </v-col>

                    <v-col class="shrink"
                           v-if="Object.keys(currentFilters).length>0"
                    >
                        <v-chip @click:close="removeAllFilters()"
                                close
                        >
                            Удалить все фильтры
                        </v-chip>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>

        <v-divider class="divider"></v-divider>
        <v-container class="grey lighten-5">
            <v-row :key="i"
                   justify="start"
                   v-for="i in Math.ceil(flats.length/numberOfColumns)"
            >
                <v-col :key="i*numberOfColumns+j"
                       cols="12"
                       sm="4"
                       v-for="j in flats.length - ((i-1)*numberOfColumns)"
                >
                    <FlatCard :flat="flats[j]">
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
            return {
                numberOfColumns: 3,
            }
        },

        validations: {
            costMax: {},
            costMin: {},
            squareMax: {},
            squareMin: {}
        },

        methods: {
            ...mapMutations([
                'setActiveCountFlatsId',
                'setActiveDistrictId',
                'setActiveDeveloperId',
                'setCostMin',
                'setCostMax',
                'setSquareMin',
                'setSquareMax',
                'setActiveWallMaterialId',
            ]),

            ...mapActions([
                'getFlats',
                'getCountFlats',
                'getDistricts',
                'getDevelopers',
                'getWallMaterials',
                'removeFilter',
                'removeAllFilters',
            ]),

            photo(image) {
                if (image != null) {
                    return image
                } else {
                    return ''
                }
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
                'wallMaterials',
                'activeWallMaterialId',
                'costMin',
                'costMax',
                'squareMin',
                'squareMax',
                'currentFilters',
            ]),
        },

        mounted() {
            this.getCountFlats();
            this.getDistricts();
            this.getDevelopers();
            this.getWallMaterials();
            this.getFlats();
        }
    }
</script>

<style scoped>
    .filters {
        padding: 16px;
        margin: 16px;
    }

    .divider {
        margin-top: 24px;
    }
</style>
