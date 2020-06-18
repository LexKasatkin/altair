<template>
    <v-dialog
            max-width="290"
            v-model="displayDialog"
    >
        <v-card>
            <v-card-title class="headline">Use Google's location service?</v-card-title>

            <v-card-text>
                Let Google help apps determine location. This means sending anonymous location data to Google, even when
                no apps are running.
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                        @click="emitDescriptionClosed"
                        color="green darken-1"
                        text
                >
                    Disagree
                </v-btn>

                <v-btn
                        @click="emitDescriptionClosed"
                        color="green darken-1"
                        text
                >
                    Agree
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "DescriptionDialog",

        props: {
            flatId: {
                type: Number,
                required: true,
            },
            value: {
                type: Boolean,
                required: true,
                default: false,
            }
        },

        methods: {
            ...mapActions('flatDetails', []),
        },

        computed: {
            ...mapGetters('flatDetails', []),

            displayDialog: {
                get() {
                    return this.value
                },
                set(newValue) {
                    this.$emit('input', newValue)
                }
            },
        },

        watch: {
            dialog(val) {
                !val && (this.displayDialog = false);
            }
        }
    }
</script>

<style scoped>

</style>
