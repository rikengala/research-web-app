# Researcher Web App using Mongoose(MongoDB), Express, Node.js and Angular in Typescript

## Prerequisites

You need to install [MongoDB](https://docs.mongodb.com/manual/administration/install-community/) either on your local machine or using a cloud service as [mLab](https://mlab.com/).

## Features

- [TypeScript](https://www.typescriptlang.org/) as Language

- [Angular](https://angular.io/) as Front End framework

- Framework: [Express.js](https://expressjs.com/)

- ODM: [Mongoose](https://mongoosejs.com/)

- Concurrently - To start both Angular client and Node server simultaneously 

- Authentication & Authorization with [JSON Web Tokens](https://jwt.io/)

- Scheduler script which fetches RSS Feed from journal every hour

- Journal used for RSS Feed `https://www.journals.elsevier.com/carbon`

- RSS Feed Link `
http://rss.sciencedirect.com/publication/science/00086223
`


## Getting Started

### Installation

1. install the dependencies using `npm install` or `npm i`

2. Set up the file `.env`, then you need to configure the file `config.ts` located in `src/config`

3. Go to client directory and install dependencies using `npm install` or `npm i`

4. Start the app from project root directory using `npm start`

5. This will start both Angular client and Node server

6. After that, go to: `http://localhost:4200/`

### Directory Structure

```
├── client
├── src
│   ├── apiV1
│   │   ├── auth
│   │   │  ├── auth.controller.ts
│   │   │  └── auth.route.ts
│   │   ├── users
│   │   │   ├── user.model.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.route.ts
│   │   ├── dataset
│   │   │   ├── dataset.model.ts
│   │   │   ├── dataset.controller.ts
│   │   │   └── dataset.route.ts
│   │   └── index.ts
│   ├── config
│   │   ├── config.ts
│   │   └── db.ts
│   ├── helpers
│   │   ├── errorHandler.ts
│   │   └── verifyToken.ts
│   ├── service
│   │   └── scheduler.ts
│   ├── .env.example
│   ├── App.ts
│   └── index.ts
├── .editorconfig
├── .gitignore
├── package.json
├── README.md
├── tsconfig.json
└── tslint.json
```

### Available routes

| Method   | Resource                           | Description                                                                                                                                 |
| :------- | :--------------                    | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`   | `/register`                        | Create a new user in the DB. You need to specify in the body the following attributes: name, email & password.                    |
| `POST`   | `/login`                           | Sign in with the email & password. If it's successful, then generates a token                                                               |
| `GET`    | `/datasets`                        | Returns the details of all papers present in the DB. You need to specify the token in the header with the following format: `Authorization: Bearer your-token` |                                                                  |
| `GET`    | `/datasets/:paperTitle`            | It returns the specified paper details in the title. You need to specify the token in the header with the following format: `Authorization: Bearer your-token` |
| `GET`    | `/datasets/:startDate/:endDate`    | It returns the specified paper details within the range of dates. You need to specify the token in the header with the following format: `Authorization: Bearer your-token` |                                                                                                   |
                                                                                                                

