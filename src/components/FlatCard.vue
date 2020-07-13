<template>
    <v-hover>
        <template v-slot="{ hover }">
            <v-card :elevation="hover ? 16 : 6" class="mx-auto flat-card">
                <div @click="openDetails" class="pointer">
                    <v-card-title class="text-start">
                        {{formattedCost}}
                    </v-card-title>

                    <v-card-subtitle class="text-start">
                        {{formattedSquareCost}}/м<sup>2</sup>
                    </v-card-subtitle>

                    <v-card-text class="text-justify">
                        <b class="color-text">{{flatAddress}}</b> |
                        {{flat.square}}м<sup>2</sup> |
                        {{flat.flat_type_name}}
                    </v-card-text>
                </div>
                <v-carousel cycle
                            height="200px"
                            hide-delimiter-background
                            show-arrows-on-hover>
                    <v-carousel-item :key="i"
                                     v-for="(item,i) in items">
                        <v-img :src="item.src"
                               @error="item.errorHandler"
                               class="flat-image"
                        ></v-img>
                    </v-carousel-item>
                </v-carousel>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
    import {mapActions} from "vuex"
    import {MEDIA_HOST} from "../../config";

    export default {
        name: "FlatCard",

        data() {
            return {
                showDialog: false
            }
        },

        props: {
            flat: Object,
        },

        methods: {
            ...mapActions('flatDetails', []),

            openDetails() {
                const flatDetails = this.$router.resolve({path: '/flat/' + this.flat.id});
                window.open(flatDetails.href, '_blank');
            },

            onErrorMainImageLoading() {
                this.errorMainImage = true;
            },

            onErrorLayoutLoading() {
                this.errorLayout = true;
            },
        },

        computed: {
            flatAddress() {
                if (this.flat.street) {
                    return `${this.flat.street} ${this.flat.house}`
                } else {
                    return `${this.flat.residential_complex} ${this.flat.house}`
                }
            },

            formattedSquareCost() {
                return new Intl.NumberFormat('ru-RU', {
                    style: 'currency', currency: 'RUB', maximumFractionDigits: 0, minimumFractionDigits: 0,
                }).format(Math.round(this.flat.cost_square));
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
                return this.errorMainImage || !this.flat.main_image_thumbnail ? null : `${MEDIA_HOST}${this.flat.main_image_thumbnail}`;
            },

            layoutImage() {
                return this.errorLayout || !this.flat.layout_thumbnail ? null : `${MEDIA_HOST}${this.flat.layout_thumbnail}`;
            },

            items() {
                return [
                    {src: this.mainImage, errorHandler: this.onErrorMainImageLoading},
                    {src: this.layoutImage, errorHandler: this.onErrorLayoutLoading}
                ].filter(image => {
                    if (image.src) return image
                });
            }
        }
    }
</script>

<style scoped>
    .flat-card {
        max-width: 320px;
        height: 100%;
    }

    .flat-image {
        max-width: 100%;
        height: 200px;
        align-content: end;
    }

    .pointer {
        cursor: pointer;
    }
</style>
