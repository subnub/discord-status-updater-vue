export default {
  async setMessageList({ commit }) {
    try {
      const messageList = await this.$messageListAPI.getMessageList();
      commit("setMessageList", messageList);
    } catch (e) {
      console.log("Error Setting Message List", e);
    }
  },
  async removeMessage({ commit }, id) {
    try {
      await this.$messageListAPI.removeMessage(id);
      commit("removeMessage", id);
    } catch (e) {
      console.log("Error Removing Message", e);
    }
  },
};
