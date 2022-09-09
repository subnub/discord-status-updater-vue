export default {
  setMessageList(state, messageList) {
    state.messageList = messageList;
  },
  removeMessage(state, id) {
    state.messageList = state.messageList.filter(
      (message) => message.id !== id
    );
  },
};
