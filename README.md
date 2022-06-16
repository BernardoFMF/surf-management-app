# surf-management-app

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

## Instructions

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
- **PG_DB** - represents the name of the database**.
- **PG_DB_TEST** - represents the name of the database for tests.
- **NODE_ENV** - must be set to the value **development**. When deploying, this variable must be set to **production**.

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
