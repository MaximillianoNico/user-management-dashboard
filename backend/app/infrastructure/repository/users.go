type User struct {
	Username  string
	FirstName string
	LastName  string
}

func (d *DBClient) CreateUser(newUser User) error {
  queries := "INSERT INTO users(username, firstname, lastname) VALUES($1, $2)"
  _, err := d.db.Exec(queries, newUser.Username. newUser.FirstName, newUser.LastName)

  return err
}