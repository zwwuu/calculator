import Screen from "../Screen/Screen";
import styles from "./Calculator.module.css";
import Keypad from "../Keypad/Keypad";

export default function Calculator() {
  return (
    <div className={styles.root}>
      <Screen />
      <Keypad />
    </div>
  );
}
