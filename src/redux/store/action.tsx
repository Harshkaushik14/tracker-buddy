export const ADD_EXPENSE = 'ADD_EXPENSE';

export const addExpense = (expense: { date: string; value: string; amount: number }) => ({
  type: ADD_EXPENSE,
  payload: expense,
});
