# Surf Club Management Application

<div align="center" style="margin-bottom: 30px;">
    <div style="margin-bottom: 30px">
        <img src="./frontend/src/assets/data/logo-blue.svg" height="300px" alt="ESC logo" />
    </div>
    <div>
        <a href="/LICENSE">
            <img src="https://img.shields.io/badge/license-MIT%20license-brightgreen" />
        </a>
        <a href="../../graphs/contributors">
            <img src="https://img.shields.io/github/contributors/BernardoFMF/surf-management-app" />
        </a>
    </div>
</div>

## Instructions to run the application

1. Clone the repository

> git clone https: // github. com/ BernardoFMF/ surf-management-app. git

2. Install [PostgreSQL](https://www.postgresql.org/download/).

3. Create a server on PostgreSQL through PGadmin, and create two databases.

- A primary database is necessary to run the application.
- An aditional database for testing purposes.

It's recommended that both databases have the same user, password and port. Only the database name must be different.

4. Run the scripts present on the [scripts_sql folder](https://github.com/BernardoFMF/surf-management-app/tree/main/docs/scripts_sql) in the following order:

- create.sql
- triggers.sql
- procedures.sql
- insert.sql

5. Install [NodeJs](https://nodejs.org/en/)

6. Install all necessary dependencies, running the following command on the [root directory](https://github.com/BernardoFMF/surf-management-app) and the [frontend directory](https://github.com/BernardoFMF/surf-management-app/tree/main/frontend).

> npm install

7. Create a .env file on the [root directory](https://github.com/BernardoFMF/surf-management-app) and add the following variables. Must follow the pattern "key"="value":

- **PORT_NUMBER** - represents the port of the database.
- **PG_USER** - represents the user of the database.
- **PG_PASSWORD** - represents the password of the database.
- **PG_HOST** - represents the host of the database.
- **PG_PORT** - represents the port of the database.
- **PG_DB** - represents the name of the database.
- **PG_DB_TEST** - represents the name of the database for tests.
- **NODE_ENV** - must be set to the value **development**. When deploying, this variable must be set to **production**.
- **EMAIL** - represents the email which will send notifications.
- **EMAIL_PASSWORD** - represents the password for the email above.
- **SECRET** - represents the secret string which will be used to sign the session cookie.

8. To start the application use the following command on the [root directory](https://github.com/BernardoFMF/surf-management-app).

> npm run dev

This command will boot up the server and the react development server, which will run on **localhost:3000**.

9. Here follow some dummy accounts to login and experiment:

- **Admin**:
    - **username**: afonsoribeiro
    - **password**: 123

- **User member**:
    - **username**: joselopes
    - **password**: 123

- **Company member**:
    - **username**: ripcurl
    - **password**: 123

***

You can also try it online, using the same dummy accounts, in here -> https://surf-management-app.herokuapp.com/

***

## Instructions to run the tests

1. Execute all steps in the chapter above up to point 6.

2. Create two new databases within the PostgreSQL server previously made. This is due
to having unit tests and integration tests for the database and both suites running
concurrently generates consistency issues. Keep in mind all the databases must have
the same credentials, differentiated only by the database name, which can be whatever
name wanted.

3. In the .env file created, besides inserting the variables mentioned, add the following:
- **PG_DB_TEST** - represents the name of the database used in unit tests;
- **PG_DB_TEST_INTEGRATION** - represents the name of the database used in
integration tests.
4. Start the application using the following command in the main directory:
- npm test on the command prompt.
