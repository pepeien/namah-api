# namah-api

### tl;dr

 ```
git clone https://github.com/pepeien/namah-api.git
cd namah-api/
npm install && npm start
```

### Setting up

1. At the root of the project create a file named `.env`;

2. Still at the root of the project copy the contents of the `.env.example` file and paste it at the newly created `.env`;

3. These are the variables and their descriptions:

| Variable       | Description  | Type           | Default | Required |
|:--------------:|:-------------|:--------------:|:--------:|:--------:|
| SECRET                 | Holds the salt for the `JWT` tokens             | String  | | ✅ |
| ORIGIN_ADDRESS         | Holds the values for the allowed `cors` origins | String  | http://localhost:3000 http://localhost:8080 | |
| DATABASE_HOST          | `MongoDB` address                               | String  | 127.0.0.1 | |
| DATABASE_PORT          | `MongoDB` port                                  | Integer | 27017 | |
| DATABASE_TABLE         | `MongoDB` table                                 | String  | namah | |
| DATABASE_MIN_POOL_SIZE | `MongoDB` minimum pool size                     | Integer | 5 | |
| DATABASE_MAX_POOL_SIZE | `MongoDB` maximum pool size                     | Integer | 15 | |
| DATABASE_USER          | `MongoDB` address                               | String  | | |
| DATABASE_PASSWORD      | `MongoDB` address                               | String  | | |

4. Value(s) for the `ORIGIN_ADDRESS`:

   4.1. Example one value: `ORIGIN_ADDRESS=http://localhost:8080`

   4.2. Example multiple values: `ORIGIN_ADDRESS=http://localhost:8080 http://localhost:4200`

### Running with Docker CLI

1. Issue `docker build -t namah-api .`;
   
2. Issue `docker run -dp 127.0.0.1:9002 namah-api`.

##### Requirements

- [Docker](https://docs.docker.com/engine/install) (Windows, Linux, Mac)

### Running W/O Docker

1. At the root of the project;

2. Issue `npm install` wait for the installation;

3. Issue `npm start`;

##### Requirements

- [npm](https://nodejs.org/en/download/package-manager) (Windows, Linux, Mac)

## Documentation

You can reach to the [Developer Portal](https://api.ericodesu.com/#/service/namah) to a more hands-on driven information.
