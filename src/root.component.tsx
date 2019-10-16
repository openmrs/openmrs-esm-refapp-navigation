import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@openmrs/esm-api";
import { useCookies } from "react-cookie";

import styles from "./root.styles.css";

export default function Root(props: RootProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [userName, setUserName] = React.useState(null);
  const [userLanguage, setUserLanguage] = useCookies(["__openmrs_language"]);

  const logoutPath = "/openmrs/appui/header/logout.action?successUrl=openmrs";

  const setCurrentUserDetails = user => {
    if (user.authenticated) {
      setIsLoggedIn(true);
      const { display } = user.user.person;
      setUserName(display);
      setUserLanguage("__openmrs_language", user.locale, { path: "/" });
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const sub = getCurrentUser({ includeAuthStatus: true }).subscribe(user =>
      setCurrentUserDetails(user)
    );

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location.href = logoutPath;
    }
  }, [isLoggedIn]);

  return (
    <div className={"header"}>
      <div>
        <a href="/openmrs" className="logo">
          <span></span>
        </a>
      </div>
      <div className={styles["action-container"]}>
        <div className={styles["username"]}>
          <i className="icon-user small"></i>
          <span>{userName}</span>
        </div>
        <a href={logoutPath}>
          Logout
          <i className="icon-signout small"></i>
        </a>
      </div>
    </div>
  );
}

type RootProps = {};
