<template>
    <div id="app">
        <Header></Header>
        <main class="bd-main">
            <div class="bd-main-container container">
                <div class="columns">
                    <div class="btn__new__item column is-2 is-offset-10 has-text-right">
                        <NewItem></NewItem>
                    </div>
                </div>
                <div class="duo columns">
                    <div class="column is-6">
                        <div class="content__cards">
                            <template v-for="i in itemList" v-if="Object.keys(itemList).length > 0">
                                <Item :item="i"></Item>
                            </template>
                            <div class="text" v-if="Object.keys(itemList).length <= 0">
                                <strong>No items to show</strong>
                            </div>
                        </div>
                    </div>
                    <div class="column is-6 historical">
                        <div class="content__cards">
                            <template v-for="j in historicalList" v-if="Object.keys(historicalList).length > 0">
                                <Item :item="j" :custom="'historical'" v-if="j"></Item>
                            </template>
                            <div class="text" v-if="Object.keys(historicalList).length <= 0">
                                <strong>No items to show</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import Item from "./components/Item";
    import NewItem from "./components/NewItem";
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: 'app',
        data() {
            return {
                isFirst: true,
                item: null,
                nextItem: null,
                timeOutClear: false,
            }
        },
        components: {
            Header,
            NewItem,
            Item
        },
        computed: {
            ...mapGetters('ItemsWaiting', {
                itemList: 'getList',
                removeItem: 'removeItem'
            }),
            ...mapGetters('HistoricalItems', {
                historicalList: 'getList',
            }),
        },
        methods: {
            ...mapMutations('ItemsWaiting', {
                startTime: 'startTime',
            }),
            ...mapMutations('Historical', {
                addItem: 'addItem',
            }),
        },

        watch: {
            // Escucha cambios en itemList
            itemList: function () {
                // Siempre iniciamos el primer porceso en cola
                if (Object.keys(this.itemList).length <= 1) {
                    this.isFirst = true;
                }
                if (this.item !== this.itemList[Object.keys(this.itemList)[0]]) {
                    this.item = this.itemList[Object.keys(this.itemList)[0]];
                    this.nextItem = null;
                    if (Object.keys(this.itemList).length > 1) {
                        this.nextItem = Object.keys(this.itemList)[1];
                    }
                    if (this.item !== undefined) {
                        if (this.isFirst) {
                            this.isFirst = !this.isFirst;
                            // pequeño retardo para visualizar el cambio de clase y su transición
                            setTimeout(() => {
                                this.$store.commit('ItemsWaiting/startTime', Object.keys(this.itemList)[0]);
                            }, 10);
                        }
                        setTimeout(() => {
                            this.item.itemState = (Math.round(Math.random()) === 0) ? 'Ok' : 'Ko';
                            this.$store.commit('HistoricalItems/addItem', this.item);
                            this.$store.commit('ItemsWaiting/removeItem', Object.keys(this.itemList)[0]);
                            this.timeOutClear = true;
                        }, this.item.time * 1000);
                    }
                }
            },
            timeOutClear: function () {
                if (this.timeOutClear) {
                    this.timeOutClear = false;
                    if (this.nextItem) {
                        this.$store.commit('ItemsWaiting/startTime', this.nextItem);
                    }
                }
            }
        },
    }
</script>

<style lang="scss">

    @import "~bulma/bulma";

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        color: #2c3e50;

        .btn__new__item {
            margin: {
                top: 50px;
            };
        }

        .content__cards {
            box-shadow: none;
            background: #8080800f;
            border-radius: 10px;
            min-height: 500px;
            position: relative;
            padding: 15px;
            margin-bottom: 15px;

            .text {
                text-align: center;
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                height: 22px;
            }
        }
    }

</style>
