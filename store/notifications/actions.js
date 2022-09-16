import { v4 as uuidv4 } from 'uuid';

export default {
  addSuccessNotification({ commit }, message) {
    const newNotification = {
      id: uuidv4(),
      type: 'success',
      message,
    };

    commit('addNotification', newNotification);
  },
  addErrorNotification({ commit }, message) {
    const newNotification = {
      id: uuidv4(),
      type: 'error',
      message,
    };

    commit('addNotification', newNotification);
  },
  removeNotification({ commit }, id) {
    commit('removeNotification', id);
  },
};
