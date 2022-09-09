export default {
  setMessageList({ commit }, messageList) {
    commit("setMessageList", messageList);
  },
  removeMessage({ commit }, id) {
    commit("removeMessage", id);
  },
};
