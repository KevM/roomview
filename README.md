# roomview

Manage when people come and go in a lab environment.

## Build

1. Clone this repo
1. ```npm install```
1. ```bower install```
1. ```grunt build```
1. ```npm start```
1. ```mv public/components/bootstrap/dist/fonts ./build/fonts``` (temporary move of bootstrap glyphs)
1. Launch your browser and nav to the app [http://localhost:8000](http://localhost:8000)

### Database

The data is stored by default under the website's _db_ directory. **Be careful not to delete files created under this path.**

### Importing Students

The badge scanner has no direct integration with a badge number to student mapping mechanism. There is a student database which stores the badge and name of the student. To import data into this database do the following to import student details into the application.

#### Data Format 

The data import mechanism expects a file students.csv to be added to the root of the site. Two columns total are expected. 

1. Badge
2. Name

Once you have a students.csv file created and copied to the root of the web site. Run the following command 

* ```node import-students.js```

You should see output like the following:

```
Number of students to import  1024
```


