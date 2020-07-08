<template>
    <v-speed-dial
            bottom="true"
            direction="left"
            open-on-hover="true"
            right="true"
            transition="scale-transition"
            v-model="fab"
    >
        <template v-slot:activator>
            <v-btn
                    color="blue darken-2"
                    dark
                    fab
                    v-model="fab"
            >
                <v-icon v-if="fab">mdi-close</v-icon>
                <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
        </template>
        <v-btn
                color="green"
                dark
                fab
                small
        >
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn
                color="indigo"
                dark
                fab
                small
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn
                color="red"
                dark
                fab
                small
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>
    </v-speed-dial>
</template>

<script>
    export default {
        name: "Phone"
    }
</script>

<style scoped>
    #lateral .float-button {
        bottom: 0;
        position: fixed;
        padding-top: 16px;
        padding-bottom: 32px;
        margin: 0 0 16px 16px;
        z-index: 10;
    }
</style>
