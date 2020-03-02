// High order function

// 1. acepts a function as an argument
// 2. returns a new function

const withCount = fn => {
  let count = 0;

  console.log("ćount", count);
  return (...args) => {
    console.log("arfs", args);
    console.log(`Call count: ${++count}`);
    return fn(...args);
  };
};

const add = (x, y) => x + y;

const countedAdd = withCount(add);

console.log("add", countedAdd);

console.log(countedAdd(2, 2));
console.log(countedAdd(1, 2));
console.log(countedAdd(4, 2));
