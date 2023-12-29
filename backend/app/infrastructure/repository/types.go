package repository

import (
	"time"

	"github.com/jackc/pgx/v5"
)

type User struct {
	UserID    string    `json:"user_id,omitempty"`
	Username  string    `json:"username"`
	FirstName string    `json:"firstname"`
	LastName  string    `json:"lastname"`
	CreatedOn time.Time `json:"created_on,omitempty"`
}

type DBClient struct {
	db *pgx.Conn
}
