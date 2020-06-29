<template>
    <div class="mx-auto main-container">
        <v-card class="mx-auto filters" elevation="6">
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
                    <v-col class="d-flex" cols="12" md="6" sm="12">
                        <v-row>
                            <v-col class="d-flex mt-2" md="4" sm="4" xs="2">
                                Стоимость:
                            </v-col>
                            <v-col class="d-flex" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setCostMin"
                                        countFrom
                                        dense
                                        :rules="[costMinRules]"
                                        label="От"
                                        :suffix="costSuffix"
                                        type="number"
                                        outlined
                                        v-model.number="costMin"
                                ></v-text-field>
                            </v-col>
                            <v-col class="align-center" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setCostMax"
                                        countTo
                                        dense
                                        :rules="[costMaxRules]"
                                        type="number"
                                        :suffix="costSuffix"
                                        label="До"
                                        outlined
                                        v-model.number="costMax"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>

                    <v-col class="d-flex" cols="12" md="6" sm="12">
                        <v-row>
                            <v-col class="d-flex mt-2" md="4" sm="4" xs="2">
                                Площадь:
                            </v-col>
                            <v-col class="d-flex" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setSquareMin"
                                        dense
                                        label="От"
                                        :rules="[squareMinRules]"
                                        type="number"
                                        :suffix="squareSuffix"
                                        outlined
                                        squareMin
                                        v-model.number="squareMin"
                                >
                                    <template slot="append">2</template>
                                </v-text-field>
                            </v-col>
                            <v-col class="d-flex" md="4" sm="4" xs="5">
                                <v-text-field
                                        @input="setSquareMax"
                                        dense
                                        label="До"
                                        :rules="[squareMaxRules]"
                                        type="number"
                                        outlined
                                        :suffix="squareSuffix"
                                        squareMax
                                        v-model.number="squareMax"
                                >
                                    <template slot="append">2</template>
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col class="d-flex" md="12" sm="12" xs="12">
                        <v-btn class="ml-2 mt-3 text-right"
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
                        <v-chip @click:close="onRemoveAllFilters"
                                close
                        >
                            Удалить все фильтры
                        </v-chip>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>

        <v-divider class="divider"></v-divider>

        <v-content class="pa-3">
            <v-layout class="pr-3 pl-3" row wrap>
                <v-flex class="justify-sm-center justify-center justify-md-start" d-flex md="7" sm="7" xs="12">
                    <v-select :items="orderings"
                              @change="onSelectOrdering"
                              item-text="title"
                              item-value="value"
                              menu-props="auto"
                              single-line
                              v-model="currentOrdering"
                    >
                        <template slot="selection" slot-scope="data">
                            <v-icon color="#0058b1">{{ data.item.icon }}</v-icon>
                            <v-subheader class="color-text">{{data.item.title}}</v-subheader>
                        </template>
                        <template slot="item" slot-scope="data">
                            <v-icon color="#0058b1">{{ data.item.icon }}</v-icon>
                            <v-subheader class="color-text">{{data.item.title}}</v-subheader>
                        </template>
                    </v-select>
                </v-flex>

                <v-flex class="justify-start text-right" md="5" sm="5" xs="12">
                    <v-btn @click="setMapShowing"
                           class="mt-0 mt-sm-6 pl-2"
                           color="green"
                           outlined
                    >{{labelBtnMap}}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-content>

        <l-map :center="center" :zoom="zoom" class="mt-4" style="height: 300px" v-if="showMap">
            <l-tile-layer :attribution="attribution"
                          :url="url"
            ></l-tile-layer>
            <v-marker-cluster>
                <l-marker :icon="icon"
                          :key="i"
                          :lat-lng="marker.position"
                          v-for="(marker,i) in this.markers">
                    <l-popup :content="marker.content"/>
                </l-marker>
            </v-marker-cluster>
        </l-map>

        <v-content>
            <v-row justify="start">
                <v-col :key="i"
                       cols="12"
                       md="4"
                       sm="6"
                       v-for="i in flats.length"
                       xs="12"
                >
                    <FlatCard :flat="flats[--i]">
                    </FlatCard>
                </v-col>
            </v-row>
        </v-content>

        <v-layout class="pa-4" row wrap>
            <v-flex class="pt-3 pl-12" md11 sm10 xs10>
                <v-pagination
                        :length="pagesCount"
                        @input="onChangeCurrentPage"
                        circle
                        color="blue"
                        v-model="currentPage"
                ></v-pagination>
            </v-flex>
            <v-flex md1 sm2 xs2>
                <v-select :items="pagination.limits"
                          @input="onChangeLimit"
                          v-model="currentLimit"
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import FlatCard from "./FlatCard";
    import {mapActions, mapGetters, mapMutations} from 'vuex'
    import {icon} from "leaflet";
    import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
    import {LMap, LMarker, LPopup} from 'vue2-leaflet';

    export default {
        name: "Flats",
        components: {
            FlatCard,
            'v-marker-cluster': Vue2LeafletMarkerCluster,
            LPopup,
            LMarker,
            LMap,
        },

        data() {
            return {
                numberOfColumns: 3,
                pagination: {
                    limits: [24, 48, 72, 96],
                },
                costSuffix: 'тыс.',
                squareSuffix: 'м',

                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                zoom: 10,
                center: [56.010563, 92.852572],
                icon: icon({
                    iconUrl: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png",
                    shadowUrl: require("@/assets/img/shadow.png"),
                    iconSize: [48, 48],
                    shadowSize: [48, 48],
                    iconAnchor: [20, 20],
                    shadowAnchor: [20, 20],
                }),
            }
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
                'setLimit',
                'setCurrentPage',
                'calculateOffset',
                'setMapShowing',
                'setCurrentOrdering',
            ]),

            searchFlats() {
                this.$refs.flatsFilters.validate();
                this.getFlats();
            },

            costMaxRules(value) {
                if (!this.costMin || Number(value) >= Number(this.costMin) || !value)
                    return true;
                else {
                    return 'Максимальная стоимость должна быть больше минимальной.';
                }
            },

            costMinRules(value) {
                if (!this.costMax || Number(value) <= Number(this.costMax) || !value)
                    return true;
                else {
                    return 'Минимальная стоимость должна быть меньше максимальной.';
                }
            },

            squareMaxRules(value) {
                if (!this.squareMin || Number(value) >= Number(this.squareMin) || !value)
                    return true;
                else {
                    return 'Максимальная площадь должна быть больше минимальной.';
                }
            },

            squareMinRules(value) {
                if (!this.squareMax || Number(value) <= Number(this.squareMax) || !value)
                    return true;
                else {
                    return 'Минимальная площадь должна быть меньше максимальной.';
                }
            },

            onChangeCurrentPage(value) {
                this.setCurrentPage(value);
                this.calculateOffset();
                this.getFlats();
            },

            onChangeLimit(value) {
                this.setLimit(value);
                this.calculateOffset();
                this.getFlats();
            },

            onSelectOrdering(value) {
                this.setCurrentOrdering(value);
                this.getFlats();
            },

            onRemoveAllFilters() {
                this.removeAllFilters();
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
                'currentLimit',
                'currentPage',
                'pagesCount',
                'showMap',
                'orderings',
                'currentOrdering',
                'markers',
            ]),

            labelBtnMap() {
                return this.showMap ? 'Скрыть карту' : 'Показать карту';
            },
        },

        mounted() {
            this.getCountFlats();
            this.getDistricts();
            this.getDevelopers();
            this.getWallMaterials();
            this.setCurrentOrdering(this.orderings[0].value);
            this.getFlats();
        },
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
