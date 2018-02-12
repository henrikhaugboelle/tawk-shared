TAWK SHARED
===========

Shared code between the web and mobile clients for the tawk demo application. You should run the commands below prior to and during developing the web and mobile applications locally.

# Installation

```
npm install (or yarn)
```

# Setup

This will start `wml`, which will copy the shared files from the root of this repository to `../tawk-app/src/shared` and `../tawk-web/src/shared`.

On first run `wml` will ask you whether to add the folders and whether to ignore `.git` and `node_modules`. You should say yes to all of these questions.

```
npm start (or yarn start)
```

It's expected that your folders (repositories) are structured in the following way (or similar). If you have another structure, you should change the `start` command in the `package.json` file to accomodate for the difference.

```
- tawk
  - tawk-api
  - tawk-web
  - tawk-app
  - tawk-shared
```
