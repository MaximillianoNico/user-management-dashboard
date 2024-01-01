# User Management Dashboard
This dashboard able to do create, update, delete and get list of users by consume Users API

## Stack we use
- Frontend <br />
we using NextJS 13 as a React Framework on webapp and Use Redux for State Management Tools also using react-hook-form for validation form

- Backend <br />
we create user service api with PosgtgreSQL as a Database, Go Gin Framework and Dockerize Service


## How to run
here is the steps for starting the webapp and service

### Connect to Database
- Install GUI Postgres, for example [sqlectron](https://sqlectron.github.io/) 
- Then, We need to pull and start postgresql by using docker with this syntax
```bash
# Pull the database
docker pull postgres

# Start database to port 5432
docker run --name mydb -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```
- Connect to GUI by using this credentials

```bash
Server Address: localhost
Port: 5432
User: postgres
Password: password
```

<br />

### Initialize Database
- Create new database 
```sql
CREATE DATABASE firstcallqa;
```

- Click database `firstcallqa` on the UI

- We create new table users
```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  firstname VARCHAR(100) UNIQUE NOT NULL,
  lastname VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

<br />

### Run Service
- Before run the service, you need to install all dependency
```bash
go mod tidy
```
- After that, you can try run by locally 
```bash
# Use makefile
make dev

# Or using go directly
go run main.go
```

<br />

### Run Webapp
- After we Run databasee and service, we can go to folder `frontend` and install dependencies
```bash
# Use makefile
cd frontend && yarn install
```
- Then run locally
```bash
# Use makefile
cd frontend && yarn dev
```