<template>
    <v-card class="mx-auto main-container">
        <div>
            <v-layout row wrap>
                <v-flex class="main-image-container" d-flex md8 sm8 xs12>
                    <v-card flat tile>
                        <v-img :src="mainImage"
                               @error="onErrorMainImageLoading"
                        ></v-img>
                    </v-card>
                </v-flex>
                <v-flex class="small-images-container" d-flex md4 sm4 xs12>
                    <v-layout column justify-space-between wrap>
                        <v-card class="small-image-container" flat tile>
                            <v-flex d-flex>
                                <v-img :src="layoutImage"
                                       @error="onErrorLayoutLoading"
                                ></v-img>
                            </v-flex>
                        </v-card>
                        <v-card flat tile>
                            <v-flex d-flex class="small-image-container">
                                <v-carousel cycle
                                            hide-delimiter-background
                                            show-arrows-on-hover
                                            height="200px">
                                    <v-card flat tile>
                                        <v-carousel-item
                                                :key="i"
                                                v-for="(image,i) in this.images"
                                        >
                                            <v-img :src="image"
                                                   @error="onErrorImagesLoading"
                                            ></v-img>
                                        </v-carousel-item>
                                    </v-card>
                                </v-carousel>
                            </v-flex>
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
                Характеристики
            </v-card-title>
            <div :key="i"
                 v-for="(qualification, i) in qualifications">
                <v-card-subtitle class="text-start font-weight-bold">
                    {{qualification.title}}
                </v-card-subtitle>

                <v-list>
                    <v-list-item-group>
                        <v-list-item :key="j"
                                     v-for="(subQualification, j) in qualification.values"
                        >
                            <v-list-item-subtitle class="text-start"
                                                  v-text="subQualification.title"></v-list-item-subtitle>
                            <v-list-item-subtitle class="text-right"
                                                  v-text="subQualification.content"></v-list-item-subtitle>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </div>


            <v-card-title class="text-start">
                Расположение:
            </v-card-title>

            <l-map :center="center" :zoom="zoom" style="height: 400px">
                <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
                <l-marker :icon="defaultIcon" :lat-lng="marker">
                    <l-tooltip :content="tooltip"></l-tooltip>
                </l-marker>
            </l-map>
        </div>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {LMap, LMarker, LPopup, LTileLayer} from 'vue2-leaflet';

    export default {
        name: "FlatDetails",

        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup
        },

        data() {
            return {
                errorImages: null,
                errorMainImage: null,
                errorLayout: null,

                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                zoom: 17,
                marker: [52.06010563, 92.852572],
                tooltip: 'kdsjfksdf',
                center: [52.06010563, 92.852572],
                defaultIcon: L.icon({
                    iconUrl: require('@/assets/img/marker.png'),
                    iconSize: [40, 60],
                    iconAnchor: [40, 60],
                    popupAnchor: [-3, -76]
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
                return this.errorMainImage ? this.noImage : this.flat.main_image_big;
            },

            layoutImage() {
                return this.errorLayout ? this.noImage : this.flat.layout_thumbnail;
            },

            images() {
                return this.errorImages ? [this.noImage] : [this.mainImage, this.layoutImage]
            },

            qualifications() {
                return [{
                    title: 'О квартире', values: [{title: 'Описание', content: this.flat.description},
                        {title: 'Общая площадь', content: `${this.flat.square} м.кв.`},
                        {title: 'Комнатнасть', content: this.flat.flat_type.name},
                        {title: 'Этаж/Этажность', content: `${this.flat.floor}/${this.flat.max_floor}`},
                    ],
                }, {
                    title: 'О доме', values: [{title: 'Стены', content: this.flat.wall_material.name},
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
                this.center = [this.flat.longitude, this.flat.latitude];
                this.marker = [this.flat.latitude, this.flat.longitude];
                this.tooltip = `${this.flat.street.name} ${this.flat.house}}`
                this.center = [this.flat.longitude, this.flat.latitude]
            },
        },
    }
</script>

<style scoped>
    .main-image-container {
        width: 640px;
        height: 480px;
        padding-left: 12px;
    }

    .small-image-container {
        width: 300px;
        height: 200px;
    }

    .small-images-container {
        height: 480px;
        padding-left: 12px;
        padding-right: 10px;
        padding-bottom: 8px;
    }

    .main-container {
        max-width: 940px;
    }
</style>
