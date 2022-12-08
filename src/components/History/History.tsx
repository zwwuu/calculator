import styles from "./History.module.css";
import { useAppSelector } from "../../features/calculator/hooks";

export default function History() {
  const history = useAppSelector((state) => state.calculator.history);

  return <div className={styles.root}>{history}</div>;
}
