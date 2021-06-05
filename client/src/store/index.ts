import { createStore } from "vuex";

export interface State {
  messages: { message: string }[];
}

export default createStore<State>({
  state: {
    messages: [],
  },
  mutations: {
    addMessage(state, data: { message: string }) {
      state.messages.push(data);
    },
    deleteMessages(state) {
      state.messages = [];
    },
  },
  actions: {
    receiveMessage({ commit }, data: { message: string }) {
      commit("addMessage", data);
    },
    initMessages({ commit }) {
      commit("deleteMessages");
    },
  },
  getters: {
    messages: (state) => {
      return state.messages;
    },
  },
  modules: {},
});
