export default ({ $axios }, inject) => {
  const getMessageList = async () => {
    const messageList = await $axios.get("/get-message-list");
    return messageList.data;
  };

  const searchMessageList = async (searchText) => {
    console.log("search message list", searchText);
    const messageList = await $axios.get(`/search-message-list/${searchText}`);
    return messageList.data;
  };

  const getMessage = async (id) => {
    const message = await $axios.get(`/get-message/${id}`);
    return message.data;
  };

  const editMessage = async (id, newText) => {
    await $axios.patch("/edit-message", { id, newText });
  };

  const addMessage = async (text) => {
    await $axios.post("/create-message", { text });
  };

  const removeMessage = async (id) => {
    await $axios.delete(`/remove-message/${id}`);
  };

  inject("messageListAPI", {
    getMessageList,
    getMessage,
    editMessage,
    addMessage,
    removeMessage,
    searchMessageList,
  });
};
