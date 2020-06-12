# openmrs-esm-refapp-navigation

A Microfrontend navbar based on the RefApp, built using
[RefApp styles](https://github.com/openmrs/openmrs-esm-refapp-styleguide).

Note that this is incompatible with the standard Microfrontends
[styleguide](https://github.com/openmrs/openmrs-esm-styleguide).

Note: This package was initially published as `@openmrs/esm-refapp-navigation`. It was renamed to `@openmrs/esm-refapp-navigation-app` for it to be compatible with [Latest SPA](https://github.com/openmrs/openmrs-rfc-frontend/blob/master/text/0026-activation-distribution.md)

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
