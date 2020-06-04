<template>
    <v-card
            class="mx-auto"
            max-width="256px"
    >
        <v-card-subtitle class="text-center">
            {{title}}
        </v-card-subtitle>
        <v-row align="center" justify="center">
            <v-img
                    :src="imagePath"
                    max-width="128px"
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

</style>
