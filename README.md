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
 
### Creating a new version

If you would like to iterate on the same pages and styles from a previous sprint or version, here is a guide to getting set up

#### Layouts

1. Create a new version folder under views, with a `Layout` subfolder

```
app
|-views
    |-version-2
    |-version-3
        |-layout
```

2. Copy 'layouts/main.html' and any relevant layouts from the previous version into your current version folder
3. Ensure that any layout template inheritance from html templates is using a relative link 

#### Styles

1. Navigate to `app/assets/sass`
2. Create a new copy of the latest version folder and name it to match the new folder name under views.
3. Import the index.scss of your new version in application.scss: `@import "./{version-name}/index";`
4. Update the body class in layouts.html to the new version name: `{% set bodyClasses = "version-3" %}`
5. Inside each _.scss file in your new sass version folder, update the version name of the parent css class to match the new body class:
```
  .version-3 {
    ...
  }