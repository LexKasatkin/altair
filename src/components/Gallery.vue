<template>
    <v-dialog v-model="dialog">
        <v-carousel cycle
                    show-arrows-on-hover>
            <v-card flat tile>
                <v-carousel-item
                        :key="i"
                        v-for="(image,i) in this.images"
                >
                    <v-img :src="image.src"
                           @error="image.errorHandler"
                    ></v-img>
                </v-carousel-item>
            </v-card>
        </v-carousel>
    </v-dialog>
</template>

<script>
    export default {
        name: "Gallery"


    }
</script>

<style scoped>

</style>
