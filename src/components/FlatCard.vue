<template>
    <v-card class="mx-auto action-card">
        <v-card-title class="text-center">
            {{title}}
        </v-card-title>

        <v-card-text class="text-justify">
            {{message}}
        </v-card-text>
        <v-row class="align-content-end justify-center">
            <v-img :src="image"
                   class="action-image"
            ></v-img>
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
    .action-card {
        max-width: 256px;
    }

    .action-image {
        max-width: 128px;
        align-content: end;
    }
</style>
