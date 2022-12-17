import Button from "../Button/Button";
import styles from "./Keypad.module.css";
import {
  clearClick,
  decimalClick,
  equalClick,
  negateClick,
  numberClick,
  operatorClick,
  undoClick,
} from "../../features/calculator/slice";
import { useAppDispatch } from "../../features/calculator/hooks";
import { IconBackspace } from "@tabler/icons";
import { useCallback, useEffect } from "react";
import { Operator } from "../../features/calculator/type";

export default function Keypad() {
  const dispatch = useAppDispatch();
  const handleKeyPress = useCallback(
    (event: { key: string; preventDefault: () => void }) => {
      const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      if (digits.includes(event.key)) {
        event.preventDefault();
        dispatch(numberClick(event.key));
      }
      if (Object.values(Operator).includes(event.key as Operator)) {
        event.preventDefault();
        dispatch(operatorClick(event.key));
      }
      if (event.key === ".") {
        event.preventDefault();
        dispatch(decimalClick());
      }
      if (event.key === "Enter") {
        event.preventDefault();
        dispatch(equalClick());
      }
      if (event.key === "Backspace") {
        event.preventDefault();
        dispatch(undoClick());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className={styles.root}>
      <Button variant={"clear"} onClick={() => dispatch(clearClick())}>
        AC
      </Button>
      <Button onClick={() => dispatch(negateClick())}>±</Button>
      <Button variant={"operator"} onClick={() => dispatch(operatorClick("%"))}>
        %
      </Button>
      <Button variant={"operator"} onClick={() => dispatch(operatorClick("/"))}>
        /
      </Button>
      <Button onClick={() => dispatch(numberClick(7))}>7</Button>
      <Button onClick={() => dispatch(numberClick(8))}>8</Button>
      <Button onClick={() => dispatch(numberClick(9))}>9</Button>
      <Button variant={"operator"} onClick={() => dispatch(operatorClick("*"))}>
        *
      </Button>
      <Button onClick={() => dispatch(numberClick(4))}>4</Button>
      <Button onClick={() => dispatch(numberClick(5))}>5</Button>
      <Button onClick={() => dispatch(numberClick(6))}>6</Button>
      <Button variant={"operator"} onClick={() => dispatch(operatorClick("-"))}>
        -
      </Button>
      <Button onClick={() => dispatch(numberClick(1))}>1</Button>
      <Button onClick={() => dispatch(numberClick(2))}>2</Button>
      <Button onClick={() => dispatch(numberClick(3))}>3</Button>
      <Button variant={"operator"} onClick={() => dispatch(operatorClick("+"))}>
        +
      </Button>
      <Button onClick={() => dispatch(decimalClick())}>.</Button>
      <Button onClick={() => dispatch(numberClick(0))}>0</Button>
      <Button aria-label={"Backspace"} onClick={() => dispatch(undoClick())}>
        <IconBackspace />
      </Button>
      <Button variant={"equal"} onClick={() => dispatch(equalClick())}>
        =
      </Button>
    </div>
  );
}
