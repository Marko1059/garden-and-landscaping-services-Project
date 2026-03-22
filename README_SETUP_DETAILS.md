
## Setting up this project (detailed version)

### setup step 1 - Install Node dependencies

Like any Node project you download from GitHub, first install dependencies with:
  ```bash
  npm install
  ```

This will populate the `node_modules` directory

### setup step 2 - Database setup

This project uses better-auth and a local SQLite database file.

Whenever we have added `better-auth` to a SvelteKit project we are told to do the following:

1. Generate the auth schema       
     ```bash
     npm run auth:schema
     ```
2. Setup/update your database by executing the generated SQL schema commands:
   - say "YES" when asked about running SQL statements to create DB tables !

   ```bash
   npm run db:push
   ```


3. Check ORIGIN & BETTER_AUTH_SECRET in .env and adjust it to your need
  
   - your project needs a `.env` ([dotenv](https://stackoverflow.com/questions/68267862/what-is-an-env-or-dotenv-file-exactly)) file containing details about where to store the local DB file
   
   - if there is no `.env` file, then create one containing the following:

     ```dotenv
     # Drizzlez
     DATABASE_URL=local.db
  
     ORIGIN="http://localhost:5173"
  
     # Better Auth
     # For production use 32 characters and generated with high entropy
     # https://www.better-auth.com/docs/installation
     BETTER_AUTH_SECRET="1e15bf2c-7a59-470b-b4f0-781e06da5163"
     ```


NOTE:
- usually we would **.gitignore** `.env` files
- but for this project I've removed this from the ignore list: so there should be a `.env` file when you fork/download this start project repo :-)
