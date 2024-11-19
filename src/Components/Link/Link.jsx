import React from "react";
import styles from "./Link.module.scss";
import { NavLink } from "react-router-dom";

export default function Link({ className = "", children, href = "#", ...props }) {
  return (
    <NavLink className={styles.link + ` ${className}`} to={href} {...props}>
      {children}
    </NavLink>
  );
}
