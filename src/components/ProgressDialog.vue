<template>
    <v-row justify="center">
        <v-dialog class="box" hide-overlay max-width="80" persistent v-model="visibility">
            <v-container fill-height fluid>
                <v-layout align-center justify-center>
                    <v-progress-circular
                            :size="55"
                            :width="6"
                            color="purple"
                            indeterminate
                    ></v-progress-circular>
                </v-layout>
            </v-container>
        </v-dialog>
    </v-row>
</template>

<script>
    export default {
        name: "ProgressDialog",

        props: {
            visibility: {
                type: Boolean,
                required: true,
            }
        },

        data() {
            return {}
        },
    }
</script>

<style scoped>
    v-progress-circular {
        margin: 1rem;
    }

    .box.noshadow {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
</style>
