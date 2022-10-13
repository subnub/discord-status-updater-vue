export default ({ $axios }, inject) => {
  const getLogs = async (limit, from, order, start) => {
    return await $axios.get(
      `/logs/get-logs?limit=${limit}&from=${from}&order=${order}&start=${start}`
    );
  };

  inject("logsAPI", { getLogs });
};
