export default {
  addNotification(state, notification) {
    state.notificationList = [...state.notificationList, notification];
  },
  removeNotification(state, id) {
    state.notificationList = state.notificationList.filter(
      (currentNotification) => currentNotification.id !== id,
    );
  },
};
