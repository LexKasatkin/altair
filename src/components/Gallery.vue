<template>
    <v-card class="card-container" flat tile>
        <v-carousel class="main-image-container"
                    height="100%"
                    show-arrows-on-hover
                    v-model="imageIndex">
            <v-toolbar color="transparent" elevation="0">
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn @click.stop="show=false" icon light>
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-layout row wrap>
                <v-flex class="justify-center" d-flex md="6" sm="6" xs="12">
                    <v-carousel-item
                            :key="i"
                            class="main-image"
                            v-for="(image,i) in this.galleryImages"
                    >
                        <v-img :src="image"
                               @error="setErrorHandler(i)"
                        ></v-img>
                    </v-carousel-item>
                </v-flex>
            </v-layout>
        </v-carousel>
    </v-card>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "Gallery",

        props: {
            imageIndex: {
                required: true,
                type: Number
            }
        },

        data() {
            return {
                errors: Array,
            };
        },

        mounted() {
            console.log(this.images);
        },

        computed: {
            show: {
                set(value) {
                    if (!value) {
                        this.$emit('close')
                    }
                },
            },
            ...mapGetters('galleryImages', [
                'galleryImages',
            ]),
        },

        methods: {
            ...mapActions('galleryImages', [
                'setImage',
            ])
        },
    }
</script>

<style scoped>
    .card-container {
        height: 100vh;
    }

    .main-image-container {
        width: 100%;
        height: 100%;
    }

    .main-image {
        vertical-align: middle;
        text-align: center;
        display: table-cell;
        text-align: center;
    }
</style>
