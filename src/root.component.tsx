import React, { useEffect, useState } from "react";
import { openmrsFetch, getCurrentUser } from "@openmrs/esm-api";

import resources from "./translations";
import { initI18n } from "./utils/translations";

import styles from "./root.styles.css";
import { Trans } from "react-i18next";

export default function Root(props: RootProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState(null);
  const [locale, setLocale] = useState("en");
  const [navBarConfig, setNavBarConfig] = useState({ type: "", url: "" });
  initI18n(resources, locale, useEffect);

  const logoutPath = "/openmrs/appui/header/logout.action?successUrl=openmrs";

  const setCurrentUserDetails = user => {
    if (user.authenticated) {
      setIsLoggedIn(true);
      setUserName(user.user.display);
      setLocale(user.locale);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(user =>
      setCurrentUserDetails(user)
    );

    const configPath = "/frontend/headerConfig";
    const configPromise = openmrsFetch(`${configPath}.json`);
    const defaultNavBarConfig = { type: "default", url: "" };

    Promise.resolve(configPromise)
      .then(configResponse => {
        setNavBarConfig(configResponse.data);
      })
      .catch(error => {
        console.log(`Unable to load the header configuration: ${error}`); // eslint-disable-line
        setNavBarConfig(defaultNavBarConfig);
      });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = logoutPath;
    }
  }, [isLoggedIn]);

  function getLogo() {
    if (navBarConfig.type == "") {
      return "";
    }
    return navBarConfig.type == "custom" ? (
      <img
        className={styles["custom-logo"]}
        src={`../${navBarConfig.url}`}
        alt="custom-logo"
      />
    ) : (
      <span></span>
    );
  }

  return (
    isLoggedIn && (
      <div className={"header"}>
        <div>
          <a href="/openmrs" className="logo" title="navbar-logo">
            {getLogo()}
          </a>
        </div>
        <div className={styles["action-container"]}>
          <a
            href="/openmrs/adminui/myaccount/myAccount.page"
            className={styles["username"]}
          >
            <i className="icon-user small"></i>
            <span>{userName}</span>
          </a>
          <a href={logoutPath}>
            <Trans>Logout</Trans>
            <i className="icon-signout small"></i>
          </a>
        </div>
      </div>
    )
  );
}

type RootProps = {};
