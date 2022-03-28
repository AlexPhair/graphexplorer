# Graph Explorer
Currently WIP. This application currently has a basic React frontend that reads from a Django API.

This application will act as a wrapper over https://www.wikidata.org, allowing users to search for different entities and view the relations between them. Entities viewed from wikidata will be cached in a Sqlite database, allowing users to CRUD the data.

## TODO
Gather data from wikidata
Implement permissions for admins/users
Add dedicated pages for viewing and querying Entities/Facts
UI improvements

## Running the project
To run the api, run: `py manage.py runserver`, with `py` being your python executable.

To run the frontend, cd into `graphexplorer-frontend` and run `npm start`.
