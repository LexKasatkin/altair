<template>
    <v-card class="mx-auto main-container" elevation="6">
        <div>
            <v-layout class="pr-3 pl-3" row wrap>
                <v-flex class="main-image-container pr-md-1 justify-sm-center justify-center justify-md-start"
                        d-flex
                        md6
                        sm12
                        xs12
                >
                    <v-card flat tile>
                        <v-img :src="mainImage"
                               @error="onErrorMainImageLoading"
                               class="main-image"
                        ></v-img>
                    </v-card>
                </v-flex>
                <v-flex class="thumbnails-container" d-flex md3 sm4 xs7>
                    <v-layout column justify-space-between wrap>
                        <v-card class="thumbnail-container pt-sm-1 pt-1 pt-md-0 pt-lg-0" flat tile>
                            <v-flex d-flex>
                                <v-img :src="layoutImage"
                                       @error="onErrorLayoutLoading"
                                ></v-img>
                            </v-flex>
                        </v-card>
                        <v-card flat tile>
                            <v-flex class="thumbnail-container pt-1" d-flex>
                                <v-carousel cycle
                                            hide-delimiter-background
                                            show-arrows-on-hover
                                            height="auto">
                                    <v-card flat tile>
                                        <v-carousel-item
                                                :key="i"
                                                v-for="(image,i) in this.images"
                                        >
                                            <v-img :src="image.src"
                                                   @error="image.errorHandler"
                                            ></v-img>
                                        </v-carousel-item>
                                    </v-card>
                                </v-carousel>
                            </v-flex>
                        </v-card>
                    </v-layout>
                </v-flex>

                <v-flex class="map-container pl-1 pt-sm-1 pt-1 pt-md-0 pt-lg-0" d-flex md3 sm8 xs5>
                    <v-layout column fill-height>
                        <v-card flat height="100%" tile>
                            <l-map :center="center" :zoom="zoom" style="height: 100%">
                                <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
                                <l-marker :icon="icon" :lat-lng="marker">
                                    <l-popup :content="content"/>
                                </l-marker>
                            </l-map>
                        </v-card>
                    </v-layout>
                </v-flex>
            </v-layout>
        </div>
        <div>
            <v-card-title class="headline text-start">
                {{formattedCost}}
            </v-card-title>

            <v-card-subtitle class="text-start">
                {{formattedSquareCost}}/м<sup>2</sup>
            </v-card-subtitle>
            <v-card-title class="text-start">
                Описание
            </v-card-title>
            <v-card-text class="text-start">
                {{this.flat.description}}
            </v-card-text>
            <v-card-title class="text-start">
                Характеристики
            </v-card-title>
            <v-content :key="i"
                       v-for="(qualification, i) in qualifications">
                <v-card-subtitle class="text-start font-weight-bold">
                    {{qualification.title}}
                </v-card-subtitle>

                <v-layout :key="j"
                          :ripple="false"
                          row
                          v-for="(subQualification, j) in qualification.values">
                    <v-flex md3 sm4 xs4>
                        <v-card-text class="text-start ml-4"
                                     v-text="subQualification.title"></v-card-text>
                    </v-flex>
                    <v-flex md9 sm8 xs8>
                        <v-card-text class="text-start ml-4"
                                     v-text="subQualification.content"></v-card-text>
                    </v-flex>
                </v-layout>
            </v-content>


            <v-card-title class="text-start">
                Расположение:
            </v-card-title>

            <l-map :center="center" :zoom="zoom" style="height: 300px">
                <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
                <l-marker :icon="icon" :lat-lng="marker">
                    <l-popup :content="content"/>
                </l-marker>
            </l-map>
        </div>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {LMap, LMarker, LPopup, LTileLayer} from 'vue2-leaflet';
    import {icon} from "leaflet";

    export default {
        name: "FlatDetails",

        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
        },

        data() {
            return {
                errorImages: null,
                errorMainImage: null,
                errorLayout: null,

                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                zoom: 15,
                marker: [56.010563, 92.852572],
                center: [56.010563, 92.852572],
                content: null,
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

        mounted() {
            this.setFlatId(this.$route.params.flatId);
            this.getFlat();
        },

        methods: {
            ...mapActions('flatDetails', [
                'setFlatId',
                'getFlat'
            ]),

            onErrorMainImageLoading() {
                this.errorMainImage = true;
            },

            onErrorImagesLoading() {
                this.errorImages = true;
            },

            onErrorLayoutLoading() {
                this.errorLayout = true;
            },
        },

        computed: {
            ...mapGetters('flatDetails', [
                'flat',
                'currentFlatId',
            ]),

            formattedSquareCost() {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency', currency: 'RUB', maximumFractionDigits: 0, minimumFractionDigits: 0,
                }).format(Math.round(this.flat.cost / this.flat.square));
            },

            formattedCost() {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency', currency: 'RUB', maximumFractionDigits: 0, minimumFractionDigits: 0,
                }).format(Math.round(this.flat.cost));
            },

            noImage() {
                return require('@/assets/img/no-image.png');
            },

            mainImage() {
                return this.errorMainImage || !this.flat.main_image_big ? this.noImage : this.flat.main_image_big;
            },

            layoutImage() {
                return this.errorLayout || !this.flat.layout_thumbnail ? this.noImage : this.flat.layout_thumbnail;
            },

            images() {
                return [
                    {src: this.mainImage, errorHandler: this.onErrorMainImageLoading},
                    {src: this.layoutImage, errorHandler: this.onErrorLayoutLoading}
                ];
            },

            qualifications() {
                return [{
                    title: 'О квартире', values: [
                        {title: 'Общая площадь', content: `${this.flat.square} м.кв.`},
                        {title: 'Комнатнасть', content: this.flat.flat_type.name},
                        {title: 'Этаж/Этажность', content: `${this.flat.floor}/${this.flat.max_floor}`},
                    ],
                }, {
                    title: 'О доме', values: [
                        {title: 'Стены', content: this.flat.wall_material.name},
                        {title: 'Застройщик', content: this.flat.developer.name},
                        {title: 'Жилой комплекс', content: this.flat.residential_complex.name},
                        {title: 'Срок сдачи', content: `${this.flat.year_of_completion} ${this.flat.quarter}`},
                    ]
                }
                ];
            },
        },

        watch: {
            flat: function () {
                this.content = `${this.flat.street.district.city.name}, ${this.flat.street.name} ${this.flat.house}`
                this.center = [this.flat.longitude, this.flat.latitude]
                this.marker = [this.flat.longitude, this.flat.latitude];
            },
        },
    }
</script>

<style scoped>

    .main-image-container {
        width: 480px;
        height: auto;
    }

    .main-image {
        width: 480px;
        height: 100%;
    }

    .thumbnail-container {
        width: 240px;
        height: auto;
    }

    .thumbnails-container {
        height: auto;
    }

    .map-container {
        height: auto;
        width: 100%;
    }

    .main-container {
        max-width: 984px;
    }
</style>
