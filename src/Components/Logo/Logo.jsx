import React from "react";
import styles from "./Logo.module.scss";

import { NavLink } from "react-router-dom";

export default function Logo({ className = "", src, href = "/", ...props }) {
  return (
    <div className={styles.logo + ` ${className}`} {...props}>
      <NavLink to={href}>
        <img className={styles.img} src={src} alt="logo" />
      </NavLink>
    </div>
  );
}
