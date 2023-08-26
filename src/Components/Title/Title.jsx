import React from "react";
import styles from "./Title.module.scss";

export default function Title({ className = "", children, ...props }) {
  return (
    <h1 className={styles.title + ` ${className}`} {...props}>
      {children}
    </h1>
  );
}
