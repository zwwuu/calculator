import styles from "./Screen.module.css";
import History from "../History/History";
import Output from "../Output/Output";

export default function Screen() {
  return (
    <div className={styles.root}>
      <History />
      <Output />
    </div>
  );
}
