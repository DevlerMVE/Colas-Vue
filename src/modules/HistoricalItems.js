import Vue from 'vue';

/**
 * Modelo de items historico
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
    addItem: (state, item) => {
        state.count++;
        Vue.set(item, 'id', state.count);
        Vue.set(state.list, 'item' + state.count, item);
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}