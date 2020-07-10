<template>
    <v-dialog v-model="show">
        <v-card flat tile>
            <v-carousel cycle
                        show-arrows-on-hover>
                <v-carousel-item
                        :key="i"
                        v-for="(image,i) in this.images"
                >
                    <v-img :src="image.src"
                           @error="setErrorHandler(i)"
                    ></v-img>
                </v-carousel-item>
            </v-carousel>
        </v-card>
    </v-dialog>
</template>

<script>
    import {MEDIA_HOST} from "../../config";

    export default {
        name: "Gallery",

        data() {
            return {
                errors: Array,
            };
        },

        props: {
            visible: Boolean,
            srcArray: {
                required: true,
                type: Array,
            },
        },

        created() {
            console.log(this.srcArray);
        },

        computed: {
            show: {
                get() {
                    return this.visible
                },
                set(value) {
                    if (!value) {
                        this.$emit('close')
                    }
                }
            }
        },

        methods: {
            setErrorHandler(index) {
                this.errors[index] = true;
            },

            images() {
                return this.srcArray.map((source, i) => this.errors[i] || !source ? null : `${MEDIA_HOST}${source}`)
            },
        },
    }
</script>

<style scoped>

</style>
