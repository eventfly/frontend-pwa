# Frontend PWA (Progressive Web App)

## Getting Started
1. Clone this repo by `gh repo clone eventfly/frontend-pwa`
2. `cd frontend-pwa`
3. Run `npm install` to install the dependencies
4. Run in development by `npm run dev`

## Project Structure
### components
This directory contains single React componets that are to be used independently.

### layouts
Layout directory containing the main two layouts of our app. The `DefaultLayout.js` is basically the one an authenticated user will see after logging in.

### pages
Contains the basic `pages/routes` views of the app. Strucutred routing provided by NEXT.js

### services
JavaScript functions, hooks that are to be imported in pages in order to perform some specific tasks. Write your utility functions, custom libraries here.

## Routes
- `/`
- `/login`
- `/signup`
- `/profile`
- `/event/:eventId`
- `/signout` *

TODO
- `/settings`
