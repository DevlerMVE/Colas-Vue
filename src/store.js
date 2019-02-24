import Vue from 'vue'
import Vuex from 'vuex'
import ItemsWaiting from './modules/ItemsWaiting'
import HistoricalItems from "./modules/HistoricalItems";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ItemsWaiting: ItemsWaiting,
    HistoricalItems: HistoricalItems
  }
})
