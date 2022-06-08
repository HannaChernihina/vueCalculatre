// Vuex Store
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    // variable,array,object
    state: {
        formula: '1',
        toggle_one: "convert to currency",
        symbol:  "",
        // clickEventName:"click",
        // symbol: "",

    },
    // changing data in state sync
    mutations: {
        changeFormula(state, formula) {
            state.formula = formula;
        },
        

    },
    // changing data in state async
    actions: {},
    // short path to data
    getters: {},
});
// export default store;
