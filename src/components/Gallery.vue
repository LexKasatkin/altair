<template>
    <v-card class="card-container" flat tile>
        <v-carousel class="main-image-container pa-16"
                    height="100%"
                    show-arrows-on-hover>
            <v-carousel-item
                    :key="i"
                    :src="image"
                    @error="this.setImage(i)"
                    class="main-image"
                    v-for="(image,i) in this.galleryImages"
            >
                <v-toolbar color="transparent" elevation="0">
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn @click.stop="show=false" icon light>
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
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
                type: Number,
            },
            visible: {
                required: true,
                type: Boolean,
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
                get() {
                    return this.visible;
                },

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
        height: 100vh;
    }

    .main-image {
        display: flex;
        justify-content: center;
        align-items: center;
        position: static;
        top: 50%;
        bottom: 50%;
    }
</style>
