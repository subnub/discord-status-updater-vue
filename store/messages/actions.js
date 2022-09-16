export default {
  async setMessageList({ commit }) {
    try {
      const messageList = await this.$messageListAPI.getMessageList();
      commit('setMessageList', messageList);
    } catch (e) {
      console.log('Error Setting Message List', e);
    }
  },
  async removeMessage({ commit, dispatch }, id) {
    try {
      await this.$messageListAPI.removeMessage(id);
      commit('removeMessage', id);
      dispatch('notifications/addSuccessNotification', 'Removed status', {
        root: true,
      });
    } catch (e) {
      console.log('Error Removing Message', e);
      dispatch('notifications/addErrorNotification', 'Error removing status', {
        root: true,
      });
    }
  },
};
