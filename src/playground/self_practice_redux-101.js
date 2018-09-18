import { createStore, combineReducers } from "redux";
import uuid from "uuid";

/* --------- Action Generators ----------*/

//ADD_EXPENSE

const addExpense = ({
  description = "",
  note = "",
  amount = 0,
  createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
});

//REMOVE_EXPENSE

const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

//EDIT_EXPENSE

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

//ADD_TEXT_FILTER

const setTextFilter = (text = " ") => ({
  type: "SET_TEXT_FILTER",
  text
});

//SORT_BY_DATE
const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

//SET_START_DATE

const setStartDate = startDate => ({
  type: "SET_START_DATE",
  startDate
});

//SET_END_DATE
const setEndDate = endDate => ({
  type: "SET_END_DATE",
  endDate
});

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      //state.push(action.expense); // push the state of expense array
      // state.concat(action.expense); // returns an empty expense array
      //return state.concat(action.expense);
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// Filters Reducer

const filtersReducerDefaultState = [
  {
    text: "",
    sortBy: "",
    startDate: undefined,
    endDate: undefined
  }
];

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

// timestamps (milliseconds)
// 33400, 10, -203
// what does 0 mean in terms of timestamp? // January 1st, 1970 (unix epoch)

// Get Visible Expenses

/* const getVisibleExpenses = (expenses, filters) => {
  return expenses;
}; */

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses
    .filter(expense => {
      const startDateMatch =
        typeof startDate !== "number" || expense.createdAt >= startDate;
      const endDateMatch =
        typeof endDate !== "number" || expense.createdAt <= endDate;
      const textMatch = true; /*  expense.description.toLowerCase().includes(text); */

      // figure out if expenses.description as the text variable string inside of it
      // covert both strings to lower case
      // includes function

      return startDateMatch && endDateMatch && textMatch;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1;
      } else if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      }
    });
};

// Store Creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
  //console.log(store.getState());
});

//console.log(store.getState());

const expOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100, createdAt: -2100 })
);

const expTwo = store.dispatch(
  addExpense({
    description: "Coffee",
    amount: 4000,
    note: "Final Payment",
    createdAt: -1000
  })
);

/* const expThree = store.dispatch(
  addExpense({ description: "Rent", amount: 300 })
);

const expFour = store.dispatch(
  addExpense({ description: "Rent", amount: 400 })
);

const expFive = store.dispatch(
  addExpense({ description: "Rent", amount: 500 })
);

//store.dispatch(removeExpense({ id: expTwo.expense.id }));

store.dispatch(
  editExpense(expThree.expense.id, {
    amount: 4500,
    createdAt: 20180903,
    note: "corrected and approved payment"
  })
);
*/

//store.dispatch(setTextFilter("coffee"));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
//store.dispatch(sortByDate());

//store.dispatch(setStartDate(1001)); //startDate 125
//store.dispatch(setStartDate()); // startDate undefined
//store.dispatch(setEndDate(-999)); // endDate 1250

// create demostate

const demostate = {
  expenses: [
    {
      id: "fasfjasdnasp",
      description: "January Rent",
      note: "This is the final payment towards rent",
      amount: 43000,
      createdAt: 0
    }
  ],
  filters: {
    text: " ",
    sortBy: " ", // date or amount
    startDate: 0,
    endDate: 0
  }
};

/* const user = {
  name: "Madesh",
  age: 2
};

console.log({
  ...user,
  city: "westmead",
  location: "Sydney"
}); */
