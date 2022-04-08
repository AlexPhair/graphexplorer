# Graph Explorer
This website acts as a wrapper over https://www.wikidata.org, allowing users to search for different entities and view the relations between them. Entities viewed from wikidata will be cached in a Sqlite database, allowing users to CRUD the data.

## Setup
Create the database with `py manage.py migrate`.

This will run a Seeder script and create two default users:

- Username: `admin` Password: `password`
- Username: `user` Password: `password`

## Running the project
To run the api, run: `py manage.py runserver`, with `py` being your python executable.

To run the frontend, cd into `graphexplorer-frontend` and run `npm start`.
