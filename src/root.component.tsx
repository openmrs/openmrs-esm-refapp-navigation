import React, { useEffect, useState } from "react";
import { getCurrentUser } from "@openmrs/esm-api";

import styles from "./root.styles.css";

export default function Root(props: RootProps) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [userName, setUserName] = React.useState(null);

  const logoutPath = "/openmrs/appui/header/logout.action?successUrl=openmrs";

  const setCurrentUserDetails = user => {
    if (user.authenticated) {
      setIsLoggedIn(true);
      const { display } = user.user;
      setUserName(display);
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
    isLoggedIn && (
      <div className={"header"}>
        <div>
          <a href="/openmrs" className="logo">
            <span></span>
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
            Logout
            <i className="icon-signout small"></i>
          </a>
        </div>
      </div>
    )
  );
}

type RootProps = {};
