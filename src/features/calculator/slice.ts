import { createSlice } from "@reduxjs/toolkit";
import { Operator } from "./type";

enum Stage {
  FIRST_NUM = "f",
  SECOND_NUM = "s",
  EQUAL = "e",
}

export interface CalculatorState {
  stage: Stage;
  display: string;
  history: string;
  operator: Operator | null;
  leftOperand: string;
  rightOperand: string;
}

const initialState: CalculatorState = {
  display: "",
  history: "",
  stage: Stage.FIRST_NUM,
  operator: null,
  leftOperand: "",
  rightOperand: "",
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    clearClick: () => {
      return initialState;
    },
    numberClick: (state, action) => {
      if (state.stage === Stage.FIRST_NUM || state.stage === Stage.EQUAL) {
        if (state.leftOperand === "0") {
          state.leftOperand = action.payload;
        } else {
          state.leftOperand = `${state.leftOperand}${action.payload}`;
        }
        state.display = state.leftOperand;
      }
      if (state.stage === Stage.SECOND_NUM) {
        state.rightOperand = `${state.rightOperand}${action.payload}`;
        state.display = state.rightOperand;
      }
    },
    operatorClick: (state, action) => {
      if ((state.stage === Stage.FIRST_NUM || state.stage === Stage.EQUAL) && state.leftOperand.length > 0) {
        state.rightOperand = "";
        state.operator = action.payload;
        state.history = `${state.leftOperand} ${state.operator} `;
        state.display = "";
        state.stage = Stage.SECOND_NUM;
      }

      if (state.stage === Stage.SECOND_NUM && state.rightOperand.length > 0 && state.operator) {
        try {
          state.leftOperand = `${evaluate(Number(state.leftOperand), state.operator, Number(state.rightOperand))}`;
          state.rightOperand = "";
          state.operator = action.payload;
          state.history = `${state.leftOperand} ${state.operator} `;
          state.display = "";
          state.stage = Stage.SECOND_NUM;
        } catch (err) {
          if (err instanceof Error) {
            state.display = err.message;
            state.history = "";
            state.stage = Stage.FIRST_NUM;
            state.operator = null;
            state.leftOperand = "";
            state.rightOperand = "";
          }
        }
      }
    },
    negateClick: (state) => {
      if ((state.stage === Stage.FIRST_NUM || state.stage === Stage.EQUAL) && state.leftOperand.length > 0) {
        state.leftOperand = `${-1 * Number(state.leftOperand)}`;
        state.display = state.leftOperand;
        state.stage = Stage.FIRST_NUM;
      }

      if (state.stage === Stage.SECOND_NUM && state.rightOperand.length > 0) {
        state.rightOperand = `${-1 * Number(state.rightOperand)}`;
        state.display = state.rightOperand;
      }
    },
    decimalClick: (state) => {
      if (state.stage === Stage.FIRST_NUM || state.stage === Stage.EQUAL) {
        if (state.leftOperand.includes(".")) return;

        state.leftOperand = `${state.leftOperand}.`;
        state.display = `${state.leftOperand}`;
        state.stage = Stage.FIRST_NUM;
      }

      if (state.stage === Stage.SECOND_NUM) {
        if (state.rightOperand.includes(".")) return;

        state.rightOperand = `${state.rightOperand}.`;
        state.display = `${state.rightOperand}`;
      }
    },
    undoClick: (state) => {
      if (state.stage === Stage.FIRST_NUM || state.stage === Stage.EQUAL) {
        state.leftOperand = state.leftOperand.slice(0, state.leftOperand.length - 1);

        state.display = state.leftOperand;

        if (state.stage === Stage.EQUAL) {
          state.stage = Stage.FIRST_NUM;
        }
      }

      if (state.stage === Stage.SECOND_NUM) {
        state.rightOperand = state.rightOperand.slice(0, state.rightOperand.length - 1);
        state.display = state.rightOperand;
      }
    },
    equalClick: (state) => {
      if ((state.stage === Stage.SECOND_NUM || state.stage === Stage.EQUAL) && state.operator) {
        state.history = "";
        try {
          state.leftOperand = `${evaluate(Number(state.leftOperand), state.operator, Number(state.rightOperand))}`;
          state.display = state.leftOperand;
          state.stage = Stage.EQUAL;
        } catch (err) {
          if (err instanceof Error) {
            state.display = err.message;
            state.history = "";
            state.stage = Stage.FIRST_NUM;
            state.operator = null;
            state.leftOperand = "";
            state.rightOperand = "";
          }
        }
      }
    },
  },
});
const evaluate = (leftOperand: number, operator: Operator, rightOperand: number) => {
  let result = 0;

  if (operator === Operator.PLUS) {
    result = leftOperand + rightOperand;
  }

  if (operator === Operator.MINUS) {
    result = leftOperand - rightOperand;
  }

  if (operator === Operator.MULTIPLY) {
    result = leftOperand * rightOperand;
  }

  if (operator === Operator.DIVIDE || operator === Operator.MODULO) {
    if (rightOperand === 0) {
      throw new Error("ERR");
    }

    if (operator === Operator.DIVIDE) {
      result = leftOperand / rightOperand;
    }

    if (operator === Operator.MODULO) {
      result = leftOperand % rightOperand;
    }
  }

  return Number(result.toFixed(5));
};

export const { clearClick, numberClick, operatorClick, negateClick, decimalClick, undoClick, equalClick } =
  calculatorSlice.actions;

export default calculatorSlice.reducer;
