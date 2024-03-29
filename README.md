# CleanBLFrontend

The system is intended for simple and efficient reporting of all types of damage or breakdowns, as well as illegal dumping of waste in public areas in our city.

Anyone who uses the application will be able to inform the authorities with a description of the problem, a picture and the exact location, so
services will be able to resolve this as quickly as possible.

No personal information is required for non-registered users. In that case only option is to preview already reported issues.

After successfully registration, users are able to submit new report with all required information and to comment already submitted issues.

In order to achieve this functionality, it is required to have backend application running that can be found [here](https://github.com/Corke123/CleanBL).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

node version is v14.15.4.

npm version is 6.14.11.

## Requirements

To use Google Maps it is necessary to input API KEY in environment.ts or environment.prod.ts if running in production mode. Example of environent file looks like below:

`export const environment = {
  production: false,
  API_KEY: 'use_your_api_key_here',
};`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
