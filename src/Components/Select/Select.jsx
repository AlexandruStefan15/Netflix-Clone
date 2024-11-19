import React from "react";
import styles from "./Select.module.scss";

export default function Select({ className = "", className_wrapper = "", children, ...props }) {
  return (
    <div className={styles.wrapper + ` ${className_wrapper}`}>
      <select className={styles.select + ` ${className}`} {...props}>
        {children}
      </select>
    </div>
  );
}

export function Option({ children, className = "", value, ...props }) {
  return (
    <option className={styles.option + ` ${className}`} value={value} {...props}>
      {children}
    </option>
  );
}
