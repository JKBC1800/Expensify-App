import { createStore } from "redux";

// Destructuring Example

/* const add = data => {
  return data.a + data.b;
};

console.log(add({ a: 2, b: 15 })); */

// example -2

/* const add = ({ a, b }) => {
  return a + b;
};

console.log(add({ a: 2, b: 15 })); */

// example -3

/* const add = ({ a, b }, c) => {
  return a + b + c;
};

console.log(add({ a: 1, b: 20 }, 100)); */

// Action Generators - functions that return action objects

// example -1

/* const incrementCount = (payload = {}) => ({
  type: "INCREMENT",
  incrementBy: typeof payload.incrementBy === "number" ? payload.incrementBy : 1
}); */

// example -2

/* const incrementCount = ({ incrementBy } = {}) => ({
  type: "INCREMENT",
  incrementBy: typeof incrementBy === "number" ? incrementBy : 1
}); */

// example - 3

/* const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy: incrementBy
});
 */

// example -4

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
});

// Action Generator for DECREMENT

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: "DECREMENT",
  decrementBy
});

// Action Generator function for RESET

const resetCount = () => ({
  type: "RESET"
});

// Action Generator function for SET

const setCount = ({ count = 1 } = {}) => ({
  type: "SET",
  count
});

// 1. Reducers are pure functions : means that it purely on its input arguments/parameters not based on external inputs.

// Not a pure function

let a = 10;
const add = b => {
  return a + b;
};

console.log(add(32)); // 42

// Not a pure function
let result;
const add = (a, b) => {
  result = a + b; // where as in this example, the function return alters the external variable than the function itself and we don't function to alter external variables, it should purely depends on its function input only. Again, this is not a pure function
};

console.log(add(10, 15)); // undefined
console.log(result); // 25

//For now, just remember that the reducer must be pure. Given the same arguments, it should calculate the next state and return it. No surprises. No side effects. No API calls. No mutations. Just a calculation.

// Pure function
const add = (a, b) => {
  return a + b;
};

console.log(add(10, 22)); // 32

// redux store functions
// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      const incrementBy =
        typeof action.incrementBy === "number" ? action.incrementBy : 1;
      return {
        count: state.count + incrementBy
      };
    case "DECREMENT":
      const decrementBy =
        typeof action.decrementBy === "number" ? action.decrementBy : 1;
      return {
        count: state.count - decrementBy
      };
    case "SET":
      return {
        count: action.count
      };
    case "RESET":
      return {
        count: 0
      };
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Actions - than an object that gets sent to the store

// i'd like to increment the count
/* store.dispatch({
  type: "INCREMENT"
}); */

store.dispatch(incrementCount());

//unsubscribe();

store.dispatch(incrementCount({ incrementBy: 10 }));

/* store.dispatch({
  type: "INCREMENT",
  incrementBy: 5
}); */

// RESET - set the count equal to zero

store.dispatch(resetCount());

/* store.dispatch({
  type: "RESET"
}); */
// I'd would like to decrement store counter

store.dispatch(incrementCount());

/* store.dispatch({
  type: "DECREMENT"
}); */

store.dispatch(decrementCount({ decrementBy: 5 }));

/* store.dispatch({
  type: "DECREMENT",
  decrementBy: 10
}); */

store.dispatch(setCount({ count: 100 }));

/* store.dispatch({
  type: "SET",
  count: 500
});

store.dispatch({
  type: "RESET"
}); */

store.dispatch(resetCount());

/* store.dispatch({
  type: ""
}); */
//console.log(store.getState());
