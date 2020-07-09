<template>
    <v-overlay
            class="float-button"
            opacity="0"
            value="true"
            z-index="100"
    >
        <v-speed-dial
                class="text-end"
                direction="left"
                open-on-hover="true"
                right="true"
                top="true"
                transition="scale-transition"
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
    </v-overlay>
</template>

<script>
    export default {
        name: "Phone"
    }
</script>

<style scoped>
    .float-button {
        width: 460px;
        height: 64px;
        z-index: 100;
    }
</style>
