package repository

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"
)

func (d *DBClient) CreateUser(newUser User) error {
	timeout := 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	rows, err := d.db.Exec(ctx, `
    INSERT INTO users (username, firstname, lastname)
    VALUES($1, $2, $3)
    ON CONFLICT (username) DO NOTHING
  `, newUser.Username, newUser.FirstName, newUser.LastName)

	if err != nil {
		return fmt.Errorf("insert failed: %w", err)
	}

	rowsAffected := rows.RowsAffected()

	if rowsAffected == 0 {
		return errors.New("username is exists")
	}

	return nil
}

func (d *DBClient) GetUsers() (error, []User) {
	var users []User

	timeout := 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	rows, err := d.db.Query(ctx, "SELECT * FROM users")
	if err != nil {
		return err, []User{}
	}

	for rows.Next() {
		var user User
		if err := rows.Scan(&user.Username, &user.FirstName, &user.LastName, &user.UserID, &user.CreatedOn); err != nil {
			return err, []User{}
		}
		users = append(users, user)
	}

	return nil, users
}

func (d *DBClient) UpdateUserInfo(user User) error {
	timeout := 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	querySelectTable := "UPDATE users SET "
	querySetValue := []string{}
	queryCondition := " WHERE username = $3"

	values := []string{}

	if user.FirstName != "" {
		querySetValue = append(querySetValue, "firstname = $1")
		values = append(values, user.FirstName)
	}

	if user.LastName != "" {
		querySetValue = append(querySetValue, "lastname = $2")
		values = append(values, user.LastName)
	}

	values = append(values, user.Username)

	interfaceSlice := make([]interface{}, len(values))
	for i, v := range values {
		interfaceSlice[i] = v
	}

	queries := querySelectTable + strings.Join(querySetValue, ",") + queryCondition
	rows, err := d.db.Exec(ctx, queries, interfaceSlice...)

	rowsAffected := rows.RowsAffected()

	if rowsAffected == 0 {
		return errors.New("username not exists")
	}
	return err
}

func (d *DBClient) DeleteUser(userName string) error {
	timeout := 5 * time.Second
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	queries := "DELETE FROM users WHERE username = $1"
	rows, err := d.db.Exec(ctx, queries, userName)
	rowsAffected := rows.RowsAffected()

	if rowsAffected == 0 {
		return errors.New("username not exists")
	}
	return err
}
