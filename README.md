# openmrs-esm-refapp-navigation

This module exposes a navigation bar (header) based on OpenMRS refapp style guide

## Pre-Requesties

NodeJS

## How to Setup?

- Run `npm install` to install all the dependencies
- Run `npm start -- --https --port 8082` to start application in dev mode.
- If you are using with OpenMRS Micro Frontend, update/add the port:url in `import-map.json` file of `openmrs-esm-root-config`.
- Run `npm run build` for production build.

## Features

Navigation bar has below features.

1. Logo
2. User Login menu & redirection on unauthenticated user
3. Logout

## Usage

Please refer [wiki](https://wiki.openmrs.org/display/projects/Frontend+-+SPA+and+Microfrontends) on how to use it in OpenMRS microfrontend environment.

## Sample Screenshots

![Sample Navbar](./screenshots/sample-nav-bar.png "Sample navigation bar")
