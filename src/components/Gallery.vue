<template>
    <v-card class="centered" flat tile>
        <v-carousel class="main-image-container"
                    height="auto"
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
        width: 100%;
        display: block;
    }

    .main-image-container {
        width: 100%;
        height: 100%;
    }
</style>
