<template>
    <v-card class="mx-auto flat-card">
        <v-card-title class="text-start">
            {{formattedCost}}
        </v-card-title>

        <v-card-subtitle class="text-start">
            {{formattedSquareCost}}/м<sup>2</sup>
        </v-card-subtitle>

        <v-card-text class="text-justify">
            <b class="color-text">{{flat.street.district}} {{flat.street.name}} {{flat.house}} кв. {{flat.flat}}</b> |
            {{flat.square}}м<sup>2</sup> |
            {{flat.flat_type.name}}
        </v-card-text>
        <v-carousel cycle
                    height="200px"
                    hide-delimiter-background
                    show-arrows-on-hover>
            <v-carousel-item
                    :key="i"
                    v-for="(image,i) in images"
            >
                <v-img :src="image" class="flat-image"></v-img>
            </v-carousel-item>
        </v-carousel>
    </v-card>
</template>

<script>
    export default {
        name: "FlatCard", props: {
            flat: Object,
        },

        computed: {
            formattedSquareCost() {
                return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})
                    .format(Math.round(this.flat.cost / this.flat.square));
            },

            formattedCost() {
                return new Intl.NumberFormat('ru-RU', {style: 'currency', currency: 'RUB'})
                    .format(Math.round(this.flat.cost));
            },

            photo() {
                if (this.flat.main_image) {
                    return this.flat.main_image;
                } else {
                    return require('@/assets/img/no-image.png');
                }
            },

            layout() {
                if (this.flat.layout) {
                    return this.flat.layout;
                } else {
                    return require('@/assets/img/no-image.png');
                }
            },

            images() {
                return [this.photo, this.layout]
            }
        }
    }
</script>

<style scoped>
    .flat-card {
        max-width: 340px;
    }

    .flat-image {
        max-width: 93%;
        height: 200px;
        align-content: end;
    }

    .color-text {
        color: #0058b1;
    }
</style>
