<template>
    <v-card class="mx-auto action-card">
        <v-card-subtitle class="text-center">
            {{title}}
        </v-card-subtitle>
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
            image: String
        }
    }
</script>

<style scoped>

</style>
