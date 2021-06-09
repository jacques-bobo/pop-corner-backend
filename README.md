# pop-corner-backend
Génie Logiciel project for the end of the semester

# Online test API
https://documenter.getpostman.com/view/13082445/TzY7dtBg

You can open it and either use the paths provided directly or use a Postman acount to test these paths (recommended)

# Installation of the API 
## 1) Download the files
Either dowload it directly, or pull it from git

## 2) Install Node.js on your computer
- Follow this link to dowload Node.js : https://nodejs.org/en/download/
- Install the adequate files on your computer

## 3) Install a MySQL server (WAMP prefered)
- Install WAMP from this link : https://www.wampserver.com/en/
- Any SQL server will work but you need this version : MySQL 5.7.23 (other versions not tested)

## 4) Configure the database
- Run the MySQL server
- Open phpMyAdmin
- Create a new database named "pop_corner"
- Click on the newly created database "pop_corner"
- Click on the "import" tab and import the file ressources/db/pop_corner.sql (you can find it in this git repository)
- Your database should now be imported

## 5) Configure the node server
- Create a folder and put the files downloaded from this git repository
- Open a command prompt in this forder
  - (cd C:mypath/myfolder to navigate to the folder)
- Enter this command to install the dependencies for this API :
```
npm install
```

## 6) Run the node server
- Start the node server with this command :
```
node index.js
```

## 7) Access and test the API
- url : http://localhost:3000/

## Documentation :
- https://documenter.getpostman.com/view/13082445/TzY7dtBg
- It is advised to create and use a Postman account, it helps a lot for API testing purposes
- Otherwise, you will have to test each path of the API by hand.
