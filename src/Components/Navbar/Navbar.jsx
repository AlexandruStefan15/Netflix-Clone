import React from "react";
import styles from "./Navbar.module.scss";
import { Trans, useTranslation } from "react-i18next";

import Link from "../Link/Link";
import Select, { Option } from "../Select/Select";
import Logo from "../Logo/Logo";

export default function Navbar({
  logo_path,
  linkText = {
    value: "Conectare",
    i18nKey: "Navbar.linkText",
  },
  className = "",
}) {
  const { t, i18n } = useTranslation();
  const languageChange = (e) => i18n.changeLanguage(e.target.value);

  return (
    <nav className={styles.nav + ` ${className}`}>
      <Logo className={styles.logo} src={logo_path} />
      <div className={styles.wrapper}>
        <Select
          className={styles.select}
          name="languages"
          onChange={languageChange}
          value={i18n.language}
        >
          <Option value="ro">Romana</Option>
          <Option value="en">English</Option>
        </Select>
        <Link to="/login">
          <Trans i18nKey={linkText.i18nKey}>{{ t: linkText.value }}</Trans>
        </Link>
      </div>
    </nav>
  );
}
