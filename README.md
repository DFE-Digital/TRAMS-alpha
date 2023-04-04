# TRAMS prototype

This is where the Department for Education Regional Services Division (RSD) TRust and Academies Management System  (TRAMS) prototypes for alpha phase live.

## View online

Visit [https://trams-prototype.herokuapp.com/](https://trams-prototype.herokuapp.com/)

Password: `trams`

## Install locally

### Requirements

Node.js LTS version 18.x.x

### Installation

1. Clone this repository to a local directory folder: `git clone git@github.com:DFE-Digital/TRAMS-alpha.git`
2. Navigate to the new directory `TRAMS-alpa` and open the terminal or command line
3. Type `npm install` to install dependencies needed to run the application

### Working locally

1. Navigate to the project directory and open the terminal or command line
2. Type `npm run dev` to start the application
3. View the application in a broswer by visiting [http://localhost:3000/](http://localhost:3000/)

## Project structure

This is a cut down version of the file structure with the important parts highlighted.

```bash
app
├── assets
│   ├── images
│   ├── javascripts
│   └── sass
│       ├── version-1 # All css used by version 1
│       │   ├── _components.scss
│       │   ├── _layout.scss
│       │   ├── _mixins.scss
│       │   ├── _typography.scss
│       │   ├── _variables.scss
│       │   └── index.scss
│       ├── version-2
│       ├── _reset.scss
│       └── application.scss # Links css to the application
├── data  # Contains the sample data used by prototype
├── views
│   ├── version-1  # Each prototype version has a folder containing its html
│   ├── version-2
│   └── index.html # The root html page for the prototype. It links to all the versions
├── config.json
├── filters.js
└── routes.js  # Controls what happens when you navigate to a page
```

## Creating a new version

If you would like to iterate on the same pages and styles from a previous sprint or version, here is a guide to getting set up.

1. Sort the css
    - Duplicate the last version-x folder in `app/assets/sass/` and name it after your new version number
    - Most scss files inside your new version folder have `.version-x {` near the top. Change this to match your new version number.
    - Update the imports in `app/assets/sass/application.scss` to add your new version.
2. Sort the html
    - Duplicate the last version-x folder in `app/views/` and name it after your new version number
    - Inside your new version folder, open `layouts/main.html` and update `{% set bodyClasses = "version-x dfe-template__body" %}` to your new version number
3. Update the template homepage
    - Link to your new version in `app/views/index.html`
    - Ensure the text describing the old version is up to date
4. Make sure it works
    - [Run the application](#working-locally) and navigate to your new version to ensure that it looks and functions as expected
