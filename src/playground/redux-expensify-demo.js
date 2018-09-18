import { createStore, combineReducers } from "redux";
import uuid from "uuid";

// ADD_EXPENSE
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

// REMOVE_EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

// EDIT_EXPENSE
// SET_TEXT_FILTER
// SORT_BY_DATE
// SORT_BY_AMOUNT
// SET_START_DATE
// SET_END_DATE

// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

// Filter Reducer

const filtersReducerDefaultState = {
  text: "",
  sortBy: "date",
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

// Filters Reducer
// text => '', sortBy => 'date', startDate =>  undefined, endDate => undefined

// Store Creation

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filter: filtersReducer
  })
);

store.subscribe(() => {
  console.log(store.getState());
});

const expenseOne = store.dispatch(
  addExpense({ description: "Rent", amount: 100 })
);
const expenseTwo = store.dispatch(
  addExpense({
    description: "grocery",
    amount: 240,
    note: "Will last for 20days"
  })
);
const expenseThree = store.dispatch(
  addExpense({
    description: "fuel",
    amount: 60,
    note: "fuelled at caltex granville"
  })
);

store.dispatch(removeExpense({ id: expenseOne.expense.id }));

//console.log(expenseOne);

// Reducer Demostate

const demoState = {
  expenses: [
    {
      id: "phildsagasdg",
      description: "May Rent",
      note: "This was the final payment for that address",
      amount: 123400,
      createdAt: 0
    }
  ],
  filters: {
    text: "rent",
    sortBy: "amount", // data or amount
    startDate: undefined,
    endDate: undefined
  }
};
