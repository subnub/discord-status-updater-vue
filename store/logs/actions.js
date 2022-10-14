export default {
  setSelectedLog({ commit }, log) {
    commit("setSelectedLog", log);
  },
  clearSelectedLog({ commit }) {
    commit("clearSelectedLog");
  },
};
