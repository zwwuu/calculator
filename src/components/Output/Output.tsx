import styles from "./Output.module.css";
import { useAppSelector } from "../../features/calculator/hooks";

export default function Output() {
  const display = useAppSelector((state) => state.calculator.display);

  return <div className={styles.root}>{display}</div>;
}
