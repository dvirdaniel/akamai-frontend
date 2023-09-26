# AkamaiFrontend

## Assumptions

The following assumptions made in the development process:
1. Used [Angular Material]([https://github.com/angular/angular-cli](https://material.angular.io/components/categories))
2. Created FileModel class to represent each file from the server response
3. Created input component to get user search input
4. Created tree-view component to display search results (display each file by his name and path by Tooltip)
5. Created Cache service to save results by prefixes entered by the user and also use it to comunicate between the 2 components created above
6. Created Data service for getting results from the server (assummed running from: http://localhost:8080 - can be changed on environment.ts file)

## Development server

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.2.

On the project directory run `npm install` for installing needed dependencies.
Afterwards, run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
