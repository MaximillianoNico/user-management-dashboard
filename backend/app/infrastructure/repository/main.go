package repository

import (
  "database/sql"

  _ "github.com/lib/pq"
)

func NewDatabase() (*DBClient, error) {
  connectionString := "user=root password=password dbname=mydb port=5455 sslmode=disable"

  db, err := sql.Open("postgres", connectionString)

  if err != nil {
    return nil, err
  }

  return &DBClient{
    db: db
  }, nil
}

func (d *DBClient) Close() {
  if d.db != nil {
    d.db.Close()
  }
}