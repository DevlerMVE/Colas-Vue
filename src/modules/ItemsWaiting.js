import Vue from 'vue';

/**
 * Modelo de items en cola
 * @type {{count: number, list: {}}}
 */
// initial state
const state = {
    list: {},
    count: 0
};


// getters
const getters = {
    getList: state => {
        return state.list
    }
};

// mutations
const mutations = {

    setName: (state, name) => {
        state.item.list.name = name;
    },

    setItemState: (state, itemState) => {
        state.item.list.itemState = itemState;
    },

    setTime: (state, time) => {
        state.item.list.time = time;
    },

    /**
     * Crea un nuevo item segun el contador
     * @param state
     * @param item
     */
    newItem: (state, item) => {
        state.count++;
        Vue.set(item, 'id', state.count);
        Vue.set(state.list, 'item' + state.count, item);
    },
    /**
     * Inicia settea el valor start del item a true
     * @param state
     * @param itemName
     */
    startTime: (state, itemName) => {
        state.list[itemName].start = true;
    },
    /**
     * Elimina el item
     * @param state
     * @param itemName
     */
    removeItem: (state, itemName) => {
        Vue.delete(state.list, itemName);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}