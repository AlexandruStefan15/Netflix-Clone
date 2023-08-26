import React from "react";
import styles from "./Footer.module.scss";
import { Trans, useTranslation } from "react-i18next";

import Select from "../Select/Select";
import { Link } from "react-router-dom";

export default function Footer({ className = "" }) {
  const { i18n } = useTranslation();
  const languageChange = (e) => i18n.changeLanguage(e.target.value);

  return (
    <footer className={styles.section + ` ${className}`}>
      <div className={styles.container}>
        <p className={styles.text}>Ai întrebări? Sună la 0800-672-120</p>
        <div className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Întrebări frecvente</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Relații cu investitorii</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Declarația de confidențialitate</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Test de viteză</Link>
            </li>
          </ul>
          <ul className={styles.navList}>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Asistență</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Cariere</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Preferințe de cookie</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Garanție legală</Link>
            </li>
          </ul>
          <ul className={styles.navList}>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Cont</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Modalități de vizionare</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Informații legate de companie</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Mențiuni legale</Link>
            </li>
          </ul>
          <ul className={styles.navList}>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Centru media</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Condiții de utilizare</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Contactează-ne</Link>
            </li>
            <li className={styles.listItem}>
              <Link className={styles.Link}>Doar pe Netflix</Link>
            </li>
          </ul>
        </div>
        <div className={styles.langSelection}>
          <Select
            className={styles.Select}
            className_wrapper={styles.SelectWrapper}
            name="languages"
            onChange={languageChange}
            value={i18n.language}
          >
            <option value="ro">Romana</option>
            <option value="en">English</option>
          </Select>
        </div>
        <p className={styles.country}>Netflix Romania</p>
      </div>
    </footer>
  );
}

Footer.Navigation = function FooterNavigation({ className = "", children, ...props }) {
  return (
    <div className={styles.Navigation + ` ${className}`} {...props}>
      {children}
    </div>
  );
};

Footer.List = function FooterList({ className = "", children, ...props }) {
  return (
    <ul className={styles.List + ` ${className}`} {...props}>
      {children}
    </ul>
  );
};

Footer.ListItem = function ListItem({ className = "", children, ...props }) {
  return (
    <li className={styles.ListItem + ` ${className}`} {...props}>
      {children}
    </li>
  );
};

Footer.Navlink = function FooterNavlink({ className = "", children, ...props }) {
  return (
    <li>
      <Link className={styles.Navlink + ` ${className}`} {...props}>
        {children}
      </Link>
    </li>
  );
};
