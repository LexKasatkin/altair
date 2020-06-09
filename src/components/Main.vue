<template>
    <div class="main-container">
        <v-card
                class="mx-auto"
                max-width="1000">
            <v-card-title>Главная</v-card-title>
            <v-card-text class="text-justify">
                Если вы хотите купить квартиру в Красноярске, но не можете найти подходящие варианты, то мы с радостью
                готовы
                вам помочь. «Альтаир-Инвест» предлагает вашему вниманию широкий спектр услуг.
                Мы готовы предложить вам свои услуги, если вы собираетесь купить или продать квартиру, мы всегда рады
                оказать
                своим клиентам необходимую помощь и консультации по любым возникающим вопросам.
                Вас интересует покупка квартир в Красноярске по ипотеке? Мы с радостью поможем вам получить кредит на
                жилье.
                Без комиссии и оплаты агентских услуг.
            </v-card-text>

        </v-card>
        <v-card-title class="text-justify">
            Основные виды деятельности компании ООО «Альтаир-Инвест»:
        </v-card-title>
        <v-container class="grey lighten-5">
            <v-row :key="i"
                   justify="start"
                   v-for="i in mainActions.length"

            >
                <v-col :key="j"
                       md="4"
                       v-for="j in mainActions[i-1].items.length"
                >
                    <ActionCard :image="mainActions[i-1].items[j-1].image"
                                :title="mainActions[i-1].items[j-1].title">
                    </ActionCard>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
    import ActionCard from "./ActionCard";

    export default {
        name: "Main",
        components: {ActionCard},
        computed: {
            mainActions() {
                return [
                    {
                        items: [{
                            title: 'Продажа квартир на вторичном рынке',
                            image: 'second-realty.png'
                        },
                            {
                                title: 'Продажа квартир в новостройках',
                                image: 'new-realty.png'
                            },
                            {
                                title: 'Коммерческая недвижимость',
                                image: 'commerce.png'
                            },]
                    },
                    {
                        items: [
                            {
                                title: 'Загородная недвижимость',
                                image: 'out-city.png'
                            },
                            {
                                title: 'Элитная недвижимость',
                                image: 'elite.png'
                            },
                            {
                                title: 'Ипотечное кредитование',
                                image: 'mortgage.png'
                            },
                        ]
                    },
                    {
                        items: [
                            {
                                title: 'Работа со всеми видами субсидий и сертификатов',
                                image: 'subsidies.png'
                            },
                            {
                                title: 'Заказ любых справок',
                                image: 'references.png'
                            },
                        ]
                    },
                ]
            },
        }
    }
</script>

<style scoped>

</style>
