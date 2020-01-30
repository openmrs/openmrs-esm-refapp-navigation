import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { of } from "rxjs";
import { openmrsFetch, getCurrentUser } from "@openmrs/esm-api";

import Root from "./root.component";

const mockGetCurrentUser = getCurrentUser;

afterEach(cleanup);

const mockUser = {
  authenticated: true,
  locale: "en_GB",
  user: {
    uuid: "uuid",
    display: "admin",
    person: { uuid: "uuid", display: "Test User" },
    privileges: [],
    roles: [{ uuid: "uuid", display: "System Developer" }]
  }
};

jest.mock("@openmrs/esm-api", () => ({
  openmrsFetch: jest.fn(),
  getCurrentUser: jest.fn().mockImplementation(() => ({
    subscribe: () => {
      return { unsubscribe: () => {} };
    },
    unsubscribe: () => {}
  }))
}));

describe(`<Root />`, () => {
  it(`renders Root without dying`, () => {
    openmrsFetch.mockResolvedValueOnce({ data: { url: "" } });
    let navBar;
    act(() => {
      render(<Root />);
    });
  });

  it(`should show user display name`, done => {
    openmrsFetch.mockResolvedValueOnce({ data: { url: "" } });
    mockGetCurrentUser.mockImplementation(() => of(mockUser));

    let navBar;
    act(() => {
      navBar = render(<Root />);
    });

    waitForElement(() => navBar.getByText("admin")).then(() => {
      done();
    });
  });

  it(`should show custom logo if header config is present`, done => {
    openmrsFetch.mockResolvedValueOnce({ data: { url: "logo.png" } });

    let navBar;
    act(() => {
      navBar = render(<Root />);
    });

    waitForElement(() => navBar.getByTitle("navbar-logo")).then(() => {
      expect(navBar.getByAltText("custom-logo").src).toMatch("logo.png");
      done();
    });
  });

  it(`should show default logo if header config is not present`, done => {
    openmrsFetch.mockRejectedValueOnce();

    let navBar;
    act(() => {
      navBar = render(<Root />);
    });

    waitForElement(() => navBar.getByTitle("navbar-logo")).then(() => {
      const logoLink = navBar.getByTitle("navbar-logo");
      expect(logoLink.children.length).toBe(1);
      expect(logoLink.children[0].tagName).toEqual("SPAN");
      done();
    });
  });
});
