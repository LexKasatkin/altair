<template>
    <v-card class="mx-auto flat-card">
        <v-card-title class="text-start">
            {{formattedCost}}
        </v-card-title>

        <v-card-subtitle class="text-start">
            {{formattedSquareCost}}/м<sup>2</sup>
        </v-card-subtitle>

        <v-card-text class="text-justify">
            <b class="color-text">{{flat.address}}</b> |
            {{flat.square}}м<sup>2</sup> |
            {{flat.flat_type}}
        </v-card-text>
        <v-row class="align-content-end justify-center">
            <v-img :src="photo" class="flat-image"></v-img>
        </v-row>
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
