<template>
    <v-card class="mx-auto main-container">
        <v-card-title class="headline text-start">
            {{formattedCost}}
        </v-card-title>

        <v-card-subtitle class="text-start">
            {{formattedSquareCost}}/м<sup>2</sup>
        </v-card-subtitle>

        <v-layout row wrap >
            <v-flex d-flex md4 sm5 xs12 class="main-image-container">
                    <v-card flat tile>
                        <v-img :src="mainImage"  
                                @error="onErrorMainImageLoading"
                        ></v-img>
                    </v-card>
            </v-flex>
            <v-flex d-flex md2 sm3 xs12>
                <v-layout row wrap  >
                        <v-card flat tile>
                            <v-flex d-flex class="small-image-container">
                                <v-img :src="layoutImage"
                                    @error="onErrorLayoutLoading"
                                    class="small-image-container"
                                ></v-img>
                            </v-flex>
                        </v-card>
                    <v-card flat tile>
                            <v-flex d-flex class="small-image-container">
                                <v-carousel cycle
                                            hide-delimiter-background
                                            show-arrows-on-hover
                                            height="210px">
                                    <v-card flat tile>
                                        <v-carousel-item
                                                :key="i"
                                                v-for="(image,i) in this.images"
                                        >
                                                <v-img :src="image"
                                                    @error="onErrorImagesLoading"
                                                    class="small-image-container"
                                                    ></v-img>
                                        </v-carousel-item>
                                    </v-card>
                                </v-carousel>
                        </v-flex>
                    </v-card>
                </v-layout>
            </v-flex>
            <v-flex flex-column md4 sm3 xs12>
                <v-card-title class="text-start">
                    Характеристики
                </v-card-title>
                <v-row align="center">
                    <v-col cols="6">
                        <v-subheader>Описание</v-subheader>
                    </v-col>

                    <v-col cols="6">
                        {{flat.description}}
                    </v-col>
                </v-row>
                <v-card-text class="text-start">
                </v-card-text>
            </v-flex>
        </v-layout>

        <v-card-title class="text-start">
            Расположение:
        </v-card-title>

        <l-map style="height: 400px" :zoom="zoom" :center="center">
            <l-tile-layer :url="url"/>
            <l-marker
                    v-for="marker in markers"
                    :key="marker.id"
                    :visible="marker.visible"
                    :draggable="marker.draggable"
                    :lat-lng.sync="marker.position"
                    @click="alert(marker)"
            >
                <l-popup :content="marker.tooltip"/>
            </l-marker>
        </l-map>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';

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
                zoom: 17,
                markers: [],
                center: [52.06010563, 92.852572],
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
                return this.errorMainImage ? this.noImage : this.flat.main_image;
            },

            layoutImage() {
                return this.errorLayout ? this.noImage : this.flat.layout_thumbnail;
            },

            images() {
                return this.errorImages ? [this.noImage] : [this.mainImage, this.layoutImage]
            },
        },

        watch: {
            flat: function () {
                this.center = [this.flat.longitude, this.flat.latitude];
                const marker = {
                    id: 0,
                    position: {lat: this.flat.longitude, lng: this.flat.latitude},
                    draggable: false,
                    visible: true,
                    tooltip: `${this.flat.street.name} ${this.flat.house}}`
                };
                this.markers.push(marker);
                this.center = [this.flat.longitude, this.flat.latitude]
            },
        },
    }
</script>

<style scoped>
    .main-image-container {
        width: 600px;
        height: 400px;
        padding-top: 4px;
        padding-left: 28px;
    }

    .small-image-container {
        width: 300px;
        height: 215px;
        padding-left: 4px;
        padding-top: 4px;
    }
</style>
