# thespot
Web based application for storing, sharing, and building itineraries for your trips.

## API
The API runs node.js and express.

## Client
Client app uses Typescript + React.

## DB
The database system used is a postgres db. To start the db run `docker-compose up db`.

Migrations for the db schema can be found in `./db`. To apply migrations to the db, run `docker-compose up migration`.

## Development
All services can be started by using `docker-compose up` in the root of the project. This should be the primary mechanism for running the db and the migrations.

You can also run the API in debug using the vscode launch config. The ui can then be started with `docker-compose` or by running `yarn dev` inside of the `client` folder.


