import { ADD_EXPENSE } from "./action";


const initialState = {
  expenses: [],
};

export default function expenseReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    default:
      return state;
  }
}
