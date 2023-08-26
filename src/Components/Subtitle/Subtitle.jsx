import React from "react";
import styles from "./Subtitle.module.scss";

export default function Subtitle({ className = "", children, ...props }) {
  return (
    <h2 className={styles.subtitle + ` ${className}`} {...props}>
      {children}
    </h2>
  );
}
