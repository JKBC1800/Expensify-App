import expensesReducer from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("should set default state", () => {
  const state = expensesReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should remove expenses if ID is not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: -1
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

// should add an expense

test("should add an expense", () => {
  const expense = {
    id: "107",
    description: "Laptop Service",
    note: "",
    createdAt: 20000,
    amount: 1025
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

// should edit an expense by id

test("should edit an expense by id", () => {
  const createdAt = 12000;
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      createdAt
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].createdAt).toBe(createdAt);
});

// should edit multiple items of an expense by id

test("should edit an expense by id", () => {
  const edit = {
    createdAt: 12000,
    amount: 295000,
    description: "HP Laptop for development",
    note: "High end configuration suitable for developer"
  };
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      edit
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state[0].edit).toBe(edit);
});

// should edit an expense if id is not found

test("should edit an expense by id", () => {
  const createdAt = 12000;
  const action = {
    type: "EDIT_EXPENSE",
    id: "-1",
    updates: {
      createdAt
    }
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});
