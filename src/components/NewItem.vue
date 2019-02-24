<template>
    <div class="newItem">
        <a class="button is-primary" @click="openModal()">Add Item</a>

        <div :class="[{'is-active': isModalOpen}, 'modal']">
            <div class="modal-background"></div>
            <div class="modal-content">

                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-64x64">
                                <img alt="Vue logo" src="../assets/new.png">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <strong>Add new item</strong>
                                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit
                                    amet
                                    massa fringilla egestas. Nullam condimentum luctus turpis.
                                </p>
                                <input class="input" type="text" placeholder="Name" v-model="newName">
                            </div>
                        </div>
                    </article>
                    <footer class="has-text-right buttons">
                        <a class="button is-primary" @click="save()">Save</a>
                        <a class="button" @click="close()">Close</a>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" @click="close()"></button>
        </div>

    </div>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "NewItem",
        data() {
            return {
                isModalOpen: false,
                newName: null
            }
        },
        methods: {
            ...mapMutations('ItemsWaiting', {
                setName: 'setName',
                newItem: 'newItem',
            }),
            openModal() {
                this.isModalOpen = true;
            },
            save() {
                const item = {
                    name: '',
                    itemState: '',
                    time: '',
                    start: false,
                };
                item.name = this.newName;
                item.itemState = undefined;
                item.time = Math.floor(Math.random() * (10 - 2 + 1) + 2);

                // this.$store.commit('ItemsWaiting/setName', this.newName);
                this.$store.commit('ItemsWaiting/newItem', item);
                this.newName = '';
                this.isModalOpen = false;
            },
            close() {
                this.newName = '';
                this.isModalOpen = false;
            }
        }
    }
</script>

<style lang="scss">
    footer {
        margin: {
            top: 15px;
        }

        &.buttons {
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
        }
    }


</style>