const sleep = (msec: number): any => {
  return new Promise((resolve) => setTimeout(resolve, msec));
};

export default sleep;
