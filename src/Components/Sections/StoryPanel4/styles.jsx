import React from "react";
import styles from "./styles.module.scss";


export function Section({ className = "", children, ...props }) {
  return (
    <section className={styles.section + ` ${className}`} {...props}>
      {children}
    </section>
  );
}

export function Container({ className = "", children, ...props }) {
  return (
    <div className={styles.container + ` ${className}`} {...props}>
      {children}
    </div>
  );
}

export function TextBox({ className = "", children, ...props }) {
  return (
    <div className={styles.textBox + ` ${className}`} {...props}>
      {children}
    </div>
  );
}

export function ImageBox({ className = "", children, ...props }) {
  return (
    <div className={styles.imageBox + ` ${className}`} {...props}>
      {children}
    </div>
  );
}



