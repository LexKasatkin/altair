<template>
    <v-hover>
        <template v-slot="{ hover }">
            <v-card :elevation="hover ? 12 : 6" class="mx-auto action-card">
                <v-card-subtitle class="text-center">
                    {{data.title}}
                </v-card-subtitle>
                <v-row class="justify-center">
                    <v-img :src="imagePath"
                           class="action-image"
                    ></v-img>
                </v-row>
            </v-card>
        </template>
    </v-hover>
</template>

<script>
    export default {
        props: {
            data: Object
        },
        name: "CompanyCard",
        computed: {
            imagePath() {
                return require("@/assets/img/" + this.data.image);
            }
        },


    }
</script>

<style scoped>
    .action-card {
        max-width: 320px;
        height: 100%;
        align-content: center;
        padding-bottom: 16px;
    }

    .action-image {
        max-width: 128px;
        align-content: end;
    }

</style>
