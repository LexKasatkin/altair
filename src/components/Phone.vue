<template>
    <v-layout class="float-button-container">
        <v-flex>
            <v-speed-dial
                    class="float-button"
                    v-model="fab"
                    bottom
                    right
                    fixed
                    direction="left"
                    open-on-hover
                    transition="scale-transition"
            >
                <template v-slot:activator>
                    <v-btn
                            v-model="fab"
                            color="blue darken-1"
                            dark
                            fab
                    >
                        <v-icon>mdi-home</v-icon>
                    </v-btn>
                </template>
                    <v-btn
                            fab
                            dark
                            large
                            color="green"
                            :href="mailLink"
                    >
                        <v-icon>mdi-email</v-icon>
                    </v-btn>
                    <v-btn
                            fab
                            dark
                            large
                            color="indigo"
                            :href="telLink"
                    >
                        <v-icon>mdi-phone</v-icon>
                    </v-btn>
            </v-speed-dial>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        name: "Phone",

        props:{
          subject: null,
          body: null,
        },

        data(){
            return {
                fab: false,
                email: '2095171@mail.ru'
            }
        },

        computed: {
            mailLink() {
                return 'mailto:'+this.email+'?subject='+this.subject+'&body='+this.body;
            },

            telLink(){
                return 'tel:209-51-71';
            }
        }
    }
</script>

<style scoped>
    .float-button-container {
        position: sticky;
        height: 0;
        z-index: 100;
    }

    .float-button{
        margin-bottom: 128px;
        margin-right: 64px;
    }
</style>
