import styles from "./Button.module.css";
import clsx from "clsx";
import { ReactNode } from "react";

type ButtonProps = {
  variant?: "operator" | "clear" | "equal";
  children: ReactNode;
  onClick(): void;
};

export default function Button({ variant, children, onClick, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.button,
        { [styles.operator]: variant === "operator" },
        { [styles.equal]: variant === "equal" },
        { [styles.clear]: variant === "clear" }
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
