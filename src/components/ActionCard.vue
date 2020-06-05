<template>
    <v-card class="mx-auto action-card">
        <v-card-subtitle class="text-center">
            {{title}}
        </v-card-subtitle>
        <v-row class="align-content-end justify-center">
            <v-img :src="imagePath"
                   class="action-image"
            ></v-img>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        props: {
            title: String,
            image: String
        },
        name: "ActionCard",
        computed: {
            imagePath() {
                return require("@/assets/img/" + this.image);
            }
        }
    }
</script>

<style scoped>
    .action-card {
        max-width: 256px;
        height: 208px;
    }

    .action-image {
        max-width: 128px;
    }

</style>
