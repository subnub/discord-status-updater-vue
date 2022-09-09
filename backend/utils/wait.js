const wait = (milliseconds = 6000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milliseconds);
  });
};

export default wait;
