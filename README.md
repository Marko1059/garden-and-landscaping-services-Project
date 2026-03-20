# FEDev-Project-Starter

This project is a basic SvelteKit project, with some basic email+password authentication:
- it used the `better-auth` official Svelte integration
- it has the following routes:
  - `/login`
    - for an existing user to login
  - `/register`
    - for a new user to register
  - `/logout`
    - for a logged-in user to logout
  - `seed.js`
    - there is a JavaScript script `seed.js` that will reset the database to just 2 users:
      - matt@itb.ie, password = `password`
      - joe@apple.com, password = `password`
      - **for this project ALL users should have password = `password`**

Each user has properties:
- `balance`, an integer balance, for whatever currency/credits is appropriate for your project case study
- `category`, a string, such as member category 'gold', or user type 'admin' etc.

## Setting up this project

### [TL;DR](https://en.wikipedia.org/wiki/TL%3BDR)
you need to run the following 3 command line actions before starting the web server:
  ```bash
  npm install
  npm run auth:schema
  npm run db:push
  ```

Then run the dev web server with

  ```bash
  npm run dev
  ```


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
- but for this project I've removed this from the ignore list
- so there should be a `.env` file when you fork/download this start project repo :-)


## Disabling client-side navigation (no caching)

By default, SvelteKit acts as a Single Page Application (SPA): 
- after the first page load, it handles navigation client-side using its own router, which can cache `load()` data and intercept redirects before they reach the server.

To simplify scripting for detecting whether a user is logged-in or not, this project disables that behaviour globally via `src/routes/+layout.js`:

```js
export const csr = false;
```

Setting `csr = false` ("client-side rendering") turns off the SvelteKit client-side router for every page. The result is that the app behaves like a traditional server-rendered website:

- Every link click and form submission is a full HTTP request to the server
- Every `load()` function always runs fresh on the server — no stale cached data
- Redirects (e.g. `redirect(302, '/login')`) are real HTTP redirects followed by the browser natively
- No JavaScript is shipped to the browser at all

### Reverting to SvelteKit defaults

To restore normal SvelteKit SPA behaviour, simply delete the file `src/routes/+layout.js`. The default value of `csr` is `true`, so removing the file is all that is needed.

If you only want to disable caching on specific pages rather than globally, you can instead export `csr = false` from an individual `+page.js` file for just that route.

