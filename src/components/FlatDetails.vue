<template>
    <v-card class="mx-auto main-container">
        <v-card-title class="headline text-start">
            {{formattedCost}}
        </v-card-title>

        <v-card-subtitle class="text-start">
            {{formattedSquareCost}}/м<sup>2</sup>
        </v-card-subtitle>

        <v-layout row wrap>
            <v-flex class="main-image-container" d-flex md4 sm6 xs12>
                <v-img :src="mainImage"
                       @error="onErrorMainImageLoading"
                ></v-img>
            </v-flex>
            <v-flex d-flex md3 sm6 xs12>
                <v-layout row wrap>
                    <v-flex class="small-image-container" d-flex>
                        <v-img :src="layoutImage"
                               @error="onErrorLayoutLoading"
                               height="180px"
                        ></v-img>
                    </v-flex>
                    <v-flex class="small-image-container" d-flex>
                        <v-carousel cycle
                                    height="170px"
                                    hide-delimiter-background
                                    show-arrows-on-hover>
                            <v-carousel-item
                                    :key="i"
                                    v-for="(image,i) in this.images"
                            >
                                <v-img :src="image"
                                       @error="onErrorImagesLoading"
                                       height="170px"></v-img>
                            </v-carousel-item>
                        </v-carousel>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex child-flex d-flex md5 sm6 xs12>
                <v-card-text class="text-start">
                    {{flat.description}}
                </v-card-text>
            </v-flex>
        </v-layout>

        <template>
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
        </template>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
    import {HOST} from "../../config";

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
                zoom: 20,
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
                return this.errorMainImage ? this.noImage : `${HOST}${this.flat.main_image}`;
            },

            layoutImage() {
                return this.errorLayout ? this.noImage : `${HOST}${this.flat.layout}`;
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
        height: 380px;
        padding-bottom: 16px;
        padding-left: 32px;
    }

    .small-image-container {
        height: 200px;
        padding: 16px;
    }
</style>
