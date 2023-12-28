package repository

import (
	"context"
	"errors"
	"time"
)

func (d *DBClient) CreateUser(newUser User) error {
	var users []User
	timeout := 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	rows, err := d.db.Query(ctx, "SELECT * FROM users where username = $1", newUser.Username)
	if err != nil {
		return err
	}

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.Username, &user.FirstName, &user.LastName, &user.UserID, &user.CreatedOn); err != nil {
			return err
		}
		users = append(users, user)
	}

	if len(users) >= 1 {
		return errors.New("User is exists")
	}

	_, err = d.db.Exec(ctx, "INSERT INTO users (username, firstname, lastname) VALUES($1, $2, $3)", newUser.Username, newUser.FirstName, newUser.LastName)
	return err
}

func (d *DBClient) GetUserByUsername(username string) (error, User) {
	var users []User

	timeout := 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	rows, err := d.db.Query(ctx, "SELECT * FROM users where username = $1", newUser.Username)
	if err != nil {
		return err, nil
	}

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.Username, &user.FirstName, &user.LastName, &user.UserID, &user.CreatedOn); err != nil {
			return err, nil
		}
		users = append(users, user)
	}

	return nil, users[0]
}
