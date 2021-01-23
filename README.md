# ClearX

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.5.

# How to run the app

After cloning the project, cd to created directory (by default 'clearX') and run `npm i`. Then cd to `/server` directory and run `npm i` again.
cd back one directory (should be in 'clearX' directory) and if all installation processes have finished, run `npm start`, and in different trminal, in same directory, run `npm run server`

After both servers are up and running, go to `http://localhost:4200` to see the app in action.

# Some guidlelines on how to use the app

App is making use of sqlite db so no prior local configuration is needed.
After some data is kept in db, and db contains valid countries, a search bar will appear, allowing the user to query the db for any of the countries in it.

csv files can be added in front with both dragNDrop and also via browsing in file system

After files are saved in db, the raw files are removed from server to make room.

The table that present the data makes use of pagination for better UX
