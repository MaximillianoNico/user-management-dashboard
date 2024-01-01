package repository

import (
	"time"

	"github.com/jackc/pgx/v5"
)

type User struct {
	UserID    string    `json:"user_id,omitempty", db:"user_id"`
	Username  string    `json:"username", db:"username"`
	FirstName string    `json:"firstname", db:"firstname"`
	LastName  string    `json:"lastname", db:"lastname"`
	CreatedOn time.Time `json:"created_on,omitempty", db:"created_on"`
}

type DBClient struct {
	db *pgx.Conn
}
