<template>
    <v-content>
        <v-card class="mx-auto main-container mb-2" elevation="6">
            <v-layout class="pr-3 pl-3" row wrap>
                <v-flex :class="[isMobile ? 'd-flex' : 'wrap']"
                        class="main-image-container justify-sm-center justify-center justify-md-start"
                        md5
                        sm6
                        xs12
                >
                    <v-carousel :class="[showGallery? 'mb-1 main-image-container' : 'mb-0 main-image-container']"
                                v-if="showGallery"
                                cycle
                                height="320px"
                                show-arrows-on-hover>
                        <v-card flat tile>
                            <v-carousel-item
                                    :key="i"
                                    v-for="(image,i) in this.images"
                                    v-bind="attrs"
                                    v-on="on"
                            >
                                <v-img :src="image.src"
                                       @error="image.errorHandler"
                                       class="main-image"
                                ></v-img>
                            </v-carousel-item>
                        </v-card>
                    </v-carousel>

                    <OpenMapComponent :center="marker"
                                      :content="content"
                                      :height="[showGallery? '320px' : '640px']"
                                      :marker="marker"
                                      v-if="!isMobile"
                    ></OpenMapComponent>
                </v-flex>
                <v-flex class="main-image-container justify-sm-center justify-center justify-md-start"
                        md7
                        sm6
                        wrap
                        xs12
                >
                    <v-card-title class="headline text-start">
                        {{formattedCost}}
                    </v-card-title>

                    <v-card-subtitle class="text-start">
                        {{formattedSquareCost}}/м<sup>2</sup>
                    </v-card-subtitle>

                    <v-card-title class="text-start">
                        Характеристики
                    </v-card-title>
                    <v-content :key="i"
                               v-for="(qualification, i) in qualifications">
                        <v-card-subtitle class="text-start pl-3 text--primary">
                            {{qualification.title}}
                        </v-card-subtitle>

                        <v-layout :key="j"
                                  :ripple="false"
                                  row
                                  v-for="(subQualification, j) in qualification.values">
                            <v-flex class="ma-0" md4 sm4 xs5>
                                <v-card-subtitle class="text-start ml-4 pa-3"
                                                 v-text="subQualification.title"></v-card-subtitle>
                            </v-flex>
                            <v-flex class="ma-0" md8 sm8 xs7>
                                <v-card-text class="text-start ml-4 pa-3"
                                             v-text="subQualification.content"></v-card-text>
                            </v-flex>
                        </v-layout>
                    </v-content>
                </v-flex>
                <v-card-title class="text-start">
                    Описание
                </v-card-title>
                <v-card-text class="text-start">
                    {{this.flatDetails.description}}
                </v-card-text>
                <OpenMapComponent :center="marker"
                                  :content="content"
                                  :height="'300px'"
                                  :marker="marker"
                                  class="mt-1"
                                  v-if="isMobile"
                ></OpenMapComponent>
            </v-layout>
        </v-card>
        <HotFlats :flatId="flatDetails.id" :house="flatDetails.house_id"></HotFlats>
        <Phone :subject="mailSubject" :body="mailBody"></Phone>
    </v-content>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import OpenMapComponent from '../components/OpenMapComponent'
    import {MEDIA_HOST} from "../../config";
    import HotFlats from "./HotFlats";
    import Phone from "./Phone";

    export default {
        name: "FlatDetails",
        components: {OpenMapComponent, HotFlats, Phone},

        data() {
            return {
                errorImages: null,
                errorMainImage: null,
                errorLayout: null,
                marker: [0, 0],
                content: null,
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
                'flatDetails',
                'currentFlatId',
            ]),

            formattedSquareCost() {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency', currency: 'RUB', maximumFractionDigits: 0, minimumFractionDigits: 0,
                }).format(Math.round(this.flatDetails.cost_square));
            },

            formattedCost() {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency', currency: 'RUB', maximumFractionDigits: 0, minimumFractionDigits: 0,
                }).format(Math.round(this.flatDetails.cost));
            },

            noImage() {
                return require('@/assets/img/no-image.png');
            },

            mainImage() {
                return this.errorMainImage || !this.flatDetails.main_image_big ? null : `${MEDIA_HOST}${this.flatDetails.main_image_big}`;
            },

            layoutImage() {
                return this.errorLayout || !this.flatDetails.layout_big ? null : `${MEDIA_HOST}${this.flatDetails.layout_big}`;
            },

            images() {
                return [
                    {src: this.mainImage, errorHandler: this.onErrorMainImageLoading},
                    {src: this.layoutImage, errorHandler: this.onErrorLayoutLoading}
                ].filter(image => {
                    if (image.src) return image
                });
            },

            showGallery() {
                return this.images.length !== 0;
            },

            isMobile() {
                return this.$vuetify.breakpoint.name === 'xs';
            },

            flatAddress() {
                if (this.flatDetails.street) {
                    return `${this.flatDetails.city} ${this.flatDetails.street} ${this.flatDetails.house}`
                } else {
                    return `${this.flatDetails.residential_complex} ${this.flatDetails.house}`
                }
            },

            qualifications() {
                return [{
                    title: 'О квартире', values: [
                        {title: 'Общая площадь', content: `${this.flatDetails.square} м.кв.`},
                        {title: 'Комнатнасть', content: this.flatDetails.flat_type},
                        {
                            title: 'Этаж/Этажность',
                            content: `${this.flatDetails.floor} из ${this.flatDetails.max_floor}`
                        },
                    ],
                }, {
                    title: 'О доме', values: [
                        {title: 'Адрес', content: `${this.flatAddress}`},
                        {title: 'Стены', content: this.flatDetails.wall_material},
                        {title: 'Застройщик', content: this.flatDetails.developer},
                        {title: 'Жилой комплекс', content: this.flatDetails.residential_complex},
                        {
                            title: 'Срок сдачи',
                            content: `${this.flatDetails.year_of_completion} ${this.flatDetails.quarter}`
                        },
                    ]
                }
                ];
            },

            mailSubject() {
                return ` ${this.flatDetails.flat_type} ${this.flatDetails.square} м.кв. ${this.flatAddress}`;
            },

            mailBody() {
                return 'Здравствуйте. Прошу сообщить о наличии данной квартиры.';
            },
        },

        watch: {
            flatDetails: function () {
                this.content = `${this.flatDetails.city}, ${this.flatDetails.street} ${this.flatDetails.house}`
                this.center = [this.flatDetails.longitude, this.flatDetails.latitude]
                this.marker = [this.flatDetails.longitude, this.flatDetails.latitude];
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

    .main-container {
        max-width: 984px;
    }
</style>
