<template>
    <v-card class="mx-auto flat-card">
        <v-card-title class="text-center">
            {{title}}
        </v-card-title>

        <v-card-text class="text-justify">
            {{message}}
        </v-card-text>
        <v-row class="align-content-end justify-center">
            <v-img :src="image" class="flat-image"></v-img>
        </v-row>
    </v-card>
</template>

<script>
    export default {
        name: "FlatCard", props: {
            title: String,
            message: String,
            image: String
        }
    }
</script>

<style scoped>
    .flat-card {
        max-width: 256px;
    }

    .flat-image {
        max-width: 90%;
        align-content: end;
    }
</style>
