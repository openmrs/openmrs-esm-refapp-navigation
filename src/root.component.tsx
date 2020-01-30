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
  const [navBarConfig, setNavBarConfig] = useState({ url: "" });
  const defaultLogo = "defaultLogo";
  const logoHeight = 60;
  const logoWidth = 120;
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
    const defaultNavBarConfig = { url: defaultLogo };

    Promise.resolve(configPromise)
      .then(configResponse => {
        setNavBarConfig(configResponse.data);
      })
      .catch(error => {
        /* eslint no-console: ["error", { allow: ["log"] }] */

        console.log(`Unable to load the header configuration: ${error}`);
        setNavBarConfig(defaultNavBarConfig);
      });

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = logoutPath;
    }
  }, [isLoggedIn]);

  return (
    isLoggedIn && (
      <div className={"header"}>
        <div>
          <a href="/openmrs" className="logo" title="navbar-logo">
            {navBarConfig.url == defaultLogo ? (
              <span></span>
            ) : (
              <img
                src={`../${navBarConfig.url}`}
                alt="custom-logo"
                height={`${logoHeight}`}
                width={`${logoWidth}`}
              />
            )}
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
