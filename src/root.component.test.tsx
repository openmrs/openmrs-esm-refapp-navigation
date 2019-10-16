import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { of } from "rxjs";
import { getCurrentUser } from "@openmrs/esm-api";

import Root from "./root.component";

const mockGetCurrentUser = getCurrentUser;
const mockSetUserLanguage = jest.fn();
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

jest.mock("react-cookie", () => ({
  useCookies: () => ["", mockSetUserLanguage]
}));

jest.mock("@openmrs/esm-api", () => ({
  openmrsFetch: jest.fn().mockResolvedValue({}),
  getCurrentUser: jest.fn().mockImplementation(() => ({
    subscribe: () => {
      return { unsubscribe: () => {} };
    },
    unsubscribe: () => {}
  }))
}));

describe(`<Root />`, () => {
  it(`renders Root without dying`, () => {
    act(() => {
      render(<Root />);
    });
  });

  it(`should show user display name`, done => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    let wrapper;
    act(() => {
      wrapper = render(<Root />);
    });

    waitForElement(() => wrapper.getByText("Test User")).then(() => {
      done();
    });
  });

  it(`should set locale in cookie`, done => {
    mockGetCurrentUser.mockImplementation(() => of(mockUser));
    let wrapper;
    act(() => {
      wrapper = render(<Root />);
    });

    waitForElement(() => wrapper.getByText("Test User")).then(() => {
      expect(mockSetUserLanguage).toBeCalledWith(
        "__openmrs_language",
        mockUser.locale,
        { path: "/" }
      );
      done();
    });
  });
});
