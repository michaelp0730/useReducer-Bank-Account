import { useReducer } from "react";
import "./App.css";

type State = {
  balance: number;
  loan: number;
  isOpen: boolean;
};

type Action =
  | { type: "openAccount" }
  | { type: "deposit"; amount: number }
  | { type: "withdraw"; amount: number }
  | { type: "requestLoan"; amount: number }
  | { type: "payLoan" }
  | { type: "closeAccount" };

const initialState: State = {
  balance: 0,
  loan: 0,
  isOpen: false,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "openAccount":
      return {
        balance: 500,
        loan: 0,
        isOpen: true,
      };
    case "deposit":
      return { ...state, balance: state.balance + action.amount };
    case "withdraw":
      if (state.balance < action.amount) return state; // prevent overdraft
      return {
        ...state,
        balance: state.balance - action.amount,
      };
    case "closeAccount":
      return {
        balance: 0,
        loan: 0,
        isOpen: false,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <h1>useReducer Bank Account</h1>
      <p>Balance: {state.balance}</p>
      <p>Loan: {state.loan}</p>
      <div style={{ marginBottom: "20px" }}>
        <button
          type="button"
          disabled={state.isOpen}
          name="openAccountBtn"
          onClick={() => dispatch({ type: "openAccount" })}
        >
          Open Account
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button
          type="button"
          disabled={!state.isOpen}
          name="deposit150Btn"
          onClick={() => dispatch({ type: "deposit", amount: 150 })}
        >
          Deposit 150
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button
          type="button"
          disabled={!state.isOpen}
          name="withdraw50Btn"
          onClick={() => dispatch({ type: "withdraw", amount: 50 })}
        >
          Withdraw 50
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button type="button" disabled={!state.isOpen} name="requestLoanBtn">
          Request Loan of 5000
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button type="button" disabled={!state.isOpen} name="payLoanBtn">
          Pay Loan
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <button
          type="button"
          disabled={!state.isOpen}
          name="closeAccountBtn"
          onClick={() => dispatch({ type: "closeAccount" })}
        >
          Close Account
        </button>
      </div>
    </>
  );
}

export default App;
