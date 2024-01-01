package repository

import (
	// "database/sql"
	"context"
	"fmt"
	"log"
	"time"

	// _ "github.com/lib/pq"
	"github.com/jackc/pgx/v5"
)

const (
	host     = "localhost"
	port     = 5455
	user     = "root"
	password = "password"
	dbName   = "firstcallqa"
)

func NewDatabase() *DBClient {
	connectionString := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s", host, port, user, password, dbName)

	// Establish a connection to the PostgreSQL database
	fmt.Println(connectionString)
	conn, err := pgx.Connect(context.Background(), connectionString)
	// conn, err := pgx.Connect(context.Background(), "postgres://root:password@db-firstcallqa:5432/firstcallqa")
	if err != nil {
		log.Fatal("Unable to connect to the database:", err)
	}

	_, err = conn.Exec(context.Background(), "SELECT 1")
	if err != nil {
		log.Fatal("Connection check failed:", err)
	}

	// db, err := sql.Open("postgres", connectionString)
	// if err != nil {
	// 	fmt.Println("Open failed:", err)
	// 	os.Exit(1)
	// }

	// _, err = db.Exec("SELECT 1")
	// if err != nil {
	// 	fmt.Println("Connection failed:", err)
	// 	os.Exit(1)
	// }

	// fmt.Println("Connection successful!")

	return &DBClient{
		db: conn,
	}
}

func (d *DBClient) Contexts() (context.Context, context.CancelFunc) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	return ctx, cancel
}

func (d *DBClient) Close() {
	ctx, _ := d.Contexts()
	if d.db != nil {
		d.db.Close(ctx)
	}
}
