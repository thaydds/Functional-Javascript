// High order function

//1. acepts a function as an argument
//2. returns a new function

//question args is default

// const withCount = fn => {
//   let count = 0;

//   console.log("ćount", count);
//   return (...args) => {
//     console.log("arfs", args);
//     console.log(`Call count: ${++count}`);
//     return fn(...args);
//   };
// };

// const add = (x, y) => x + y;

// const countedAdd = withCount(add);

// console.log("add", countedAdd);

// console.log(countedAdd(2, 2));
// console.log(countedAdd(1, 2));
// console.log(countedAdd(4, 2));

//curring

// const sum = x => y => x + y;

// console.log(sum(3)(4));

// pure function

//f(x) = x + 1
// const f = x => (x = 1);

//Ex 1 - global state
// const COST_OF_ITEM = 17;
// const cartTotal = quantity => (COST_OF_ITEM = quantity);

// console.log(cartTotal(2));
// console.log(cartTotal(2));

// const inspect = Symbol("util.inspect.custom");

// const Valid = v => ({
//   map: fn => Valid(fn(v)),
//   chain: fn => fn(v),
//   cata: ({ valid }) => valid(v),
//   concat: fn => fn(v),
//   [inspect]: () => `Valid: ${v}`,
// });

// const Invalid = v => ({
//   map: fn => Invalid(v),
//   chain: fn => Invalid(v),
//   cata: ({ invalid }) => invalid(v),
//   concat: fn =>
//     fn(v).cata({
//       valid: x => v,
//       invalid: x => Invalid([v, x]),
//     }),
//   [inspect]: () => `Invalid: ${v}`,
// });

// const validate = (pred, err) => v => (pred(v) ? Valid(v) : Invalid(err));

// const add = y => x => x + y;

// const isLessThan = y => x => x < y;

// const isGreatThan = y => x => x > y;

// const concat = (x, y) => v => x(v).concat(y);

// const cata = branches => x => v => x(v).cata(branches);

// const all = (...x) => x.reduce(concat, Valid);

// const validation = cata({
//   invalid: console.error.bind(null, "wrong ->"),
//   valid: console.log.bind(null, "valid -> "),
// })(
//   all(
//     validate(isLessThan(10), "must be less than 10"),
//     validate(isGreatThan(4), "must be great than 4")
//   )
// );

// validation(5);

// const comp = f => g => v => f(g(v));
// const add10 = x => x + 10;
// const double = y => y * 2;

// console.log([1, 2, 3, 4].map(comp(add10)(double)));
Function.prototype[Symbol.for("nodejs.util.inspect.custom")] =
  Function.prototype.toString;

const Box = x => ({
  map: f => Box(f(x)),
  fold: f => f(x),
  inspect: () => `Box(${x})`,
});

const nextCharForNumberString = str =>
  Box(str)
    .map(s => s.trim())
    .map(r => new Number(r))
    .map(i => i + 1)
    .map(i => String.fromCharCode(i))
    .fold(c => c.toLowerCase());

// const result = nextCharForNumberString(" 64");

const Right = x => ({
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  map: f => Left(x),
  fold: (f, g) => f(x),
  inspect: () => `Left(${x})`,
});

const fromNullable = x => (x != null ? Right(x) : Left(null));

const findColor = name =>
  fromNullable(
    {
      red: "#ff4444",
      blue: "#3b5998",
      yellow: "#fff68f",
    }[name]
  );

const result = findColor("blue")
  .chain(sumColor)
  .map(x => x.slice(1))
  .fold(
    e => "color not found",
    c => c.toUpperCase()
  );

console.log(result);
