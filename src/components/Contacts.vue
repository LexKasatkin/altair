<template>
    <v-content class="mx-auto main-container pb-3">
        <v-card elevation="6">
            <v-row>
                <v-col md="6" sm="6" xs="12">
                    <v-img :src="avatar" class="avatar ml-3">
                    </v-img>
                </v-col>

                <v-col md="6" sm="6" xs="12">
                    <v-card-title class="text-start">Касаткина Анна Андреевна</v-card-title>
                    <v-card-subtitle class="text-start">209-51-71, 8 (983) 269-51-71</v-card-subtitle>
                    <v-card-text class="text-start">2095171@mail.ru
                        <p>Наш адрес: {{this.address}}</p>
                    </v-card-text>
                </v-col>
            </v-row>

            <l-map :center="center" :zoom="zoom" style="height: 300px">
                <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>
                <l-marker :icon="icon" :lat-lng="marker">
                    <l-popup :content="this.address"/>
                </l-marker>
            </l-map>
        </v-card>
    </v-content>
</template>

<script>
    import {icon} from "leaflet";
    import {LPopup} from 'vue2-leaflet';

    export default {
        name: "Contacts",

        components: {
            LPopup,
        },

        data() {
            return {
                address: "г.Красноярск, ул. Мусорского 18",

                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                zoom: 16,
                marker: [55.980180, 92.914331],
                center: [55.980180, 92.914331],
                content: null,
                icon: icon({
                    iconUrl: "https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Azure.png",
                    shadowUrl: require("@/assets/img/shadow.png"),
                    iconSize: [48, 48],
                    shadowSize: [48, 48],
                    iconAnchor: [20, 20],
                    shadowAnchor: [20, 20],
                }),
            }
        },

        computed: {
            avatar() {
                return require('@/assets/img/avatar.jpg');
            }
        }
    }
</script>

<style scoped>
    .main-container {
        max-width: 984px;
    }

    .avatar {
        width: 400px;
        height: 300px;
    }
</style>