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

## 6) Créer les variables globales pour l’adresse mail et le mot de passe utilisés pour l’envoi de mails
### WARNING : the email adress and the password are not specified in this document for security reasons, you will find it in the report, or ask Jacques Bonnand (jacques.bonnand@eleve.isep.fr) for them.

### Windows 
- Open a command prompt
- Enter the two following commande lines and replace email et password with the real ones.
```
setx POP_CORNER_MAIL_ADRESS "email"
setx POP_CORNER_MAIL_PASSWORD "password"
```
### Mac OS
Permanent environment variables are added to the .bash_profile file:
Open a terminal with admin-level privileges
1.	 Find the path to .bash_profile by using:
   ```
   ~/.bash-profile
   ```
2.	Open the .bash_profile file with a text editor of your choice.
3.	Scroll down to the end of the .bash_profile file.
4.	Use the export command to add the new environment variables  and replace email et password with the real ones:
```
export POP_CORNER_MAIL_ADRESS = "email"
export POP_CORNER_MAIL_PASSWORD = "password"
```
5.	Save any changes you made to the .bash_profile file.
6.	Execute the new .bash_profile by either restarting the terminal window or using:
```
source ~/.bash-profile
```




## 7) Run the node server
- Start the node server with this command :
```
node index.js
```

## 8) Access and test the API
- url : http://localhost:3000/

## API Documentation :
- https://documenter.getpostman.com/view/13082445/TzY7dtBg
- It is advised to create and use a Postman account, it helps a lot for API testing purposes
- Otherwise, you will have to test each path of the API by hand.
