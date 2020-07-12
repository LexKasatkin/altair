<template>
    <v-card class="centered" flat tile>
        <!--        <v-layout row child-flex justify-center align-center wrap>-->
        <!--            <v-flex fill-heigth>-->
        <v-carousel class="main-image-container"
                    height="70%"
                    show-arrows-on-hover
                    v-model="imageIndex">
            <v-carousel-item
                    :key="i"
                    class="main-image"
                    v-for="(image,i) in this.galleryImages"
            >
                <v-img :src="image"
                       @error="setErrorHandler(i)"
                ></v-img>
            </v-carousel-item>
        </v-carousel>
        <!--            </v-flex>-->
        <!--        </v-layout>-->
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

            ...mapGetters('galleryImages', [
                'galleryImages',
            ]),
        },

        methods: {
            setErrorHandler(index) {
                this.setImage(index, null);
            },

            ...mapActions('galleryImages', [
                'setImage',
            ])
        },
    }
</script>

<style scoped>
    .main-image {
        width: 70%;
        height: 70%;
        margin: auto;
        display: block;
    }

    .main-image-container {
        width: 100%;
        height: auto;
    }
</style>
