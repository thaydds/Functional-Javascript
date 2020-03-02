Function.prototype[Symbol.for("nodejs.util.inspect.custom")] =
  Function.prototype.toString;

//It wraps around the evaluated
// condition and allows us to specify functions to be executed later
const Right = x => ({
  chain: f => f(x),
  map: f => Right(f(x)),
  fold: (f, g) => g(x),
  inspect: () => `Right(${x})`,
});

const Left = x => ({
  chain: f => Left(x),
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
  .map(x => x.slice(1))
  .fold(
    e => "color not found",
    c => c.toUpperCase()
  );

// handle errors with either

const fs = require("fs");

const tryCatch = f => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
// const getPort = () => {
//   try {
//     const str = fs.readFileSync("config.json");
//     const config = JSON.parse(str);
//     return config.port;
//   } catch (e) {
//     return "error";
//   }
// };

const getPort = () =>
  tryCatch(() => fs.readFileSync("config.json"))
    .chain(c => tryCatch(() => JSON.parse(c)))
    .fold(
      e => 3000,
      c => c.port
    );

const getResultPortResult = getPort();

console.log(getResultPortResult);
