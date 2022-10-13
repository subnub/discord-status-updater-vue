const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    clearTimeout(timer);
    const args = arguments;
    const that = this;
    timer = setTimeout(function () {
      fn.apply(that, args);
    }, delay);
  };
};

export default debounce;
