package repos

import (
	"database/sql"
	"github.com/mattn/go-sqlite3"
	"log"
	"github.com/tonymtz/songbox/models"
	"errors"
)

var DB_DRIVER string

type UsersRepository interface {
	FindById(int64) (*models.User, error)
	FindByProviderId(string) (*models.User, error)
	Insert(*models.User) (int64, error)
	Remove()
	Update()
}

func NewUsersRepository(dbPath string) UsersRepository {
	return &userRepository{
		dbPath: dbPath,
	}
}

type userRepository struct {
	dbPath string
}

func (this *userRepository) FindById(id int64) (*models.User, error) {
	database, _, err := openDB(this.dbPath)

	if err != nil {
		return nil, err
	}

	foundUser := &models.User{}

	err = database.QueryRow(
		"SELECT id, id_dropbox, display_name, email, profile_picture, role, token FROM user WHERE id=?",
		id,
	).Scan(
		&foundUser.Id,
		&foundUser.IdDropbox,
		&foundUser.DisplayName,
		&foundUser.Email,
		&foundUser.ProfilePicture,
		&foundUser.Role,
		&foundUser.Token,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("No user with that ID.")
	}

	if err != nil {
		return nil, err
	}

	return foundUser, nil
}

func (this *userRepository) FindByProviderId(providerId string) (*models.User, error) {
	database, _, err := openDB(this.dbPath)

	if err != nil {
		return nil, err
	}

	foundUser := &models.User{}

	err = database.QueryRow(
		"SELECT id, id_dropbox, display_name, email, profile_picture, role, token FROM user WHERE id_dropbox=?",
		providerId,
	).Scan(
		&foundUser.Id,
		&foundUser.IdDropbox,
		&foundUser.DisplayName,
		&foundUser.Email,
		&foundUser.ProfilePicture,
		&foundUser.Role,
		&foundUser.Token,
	)

	if err == sql.ErrNoRows {
		return nil, errors.New("No user with that ID.")
	}

	if err != nil {
		return nil, err
	}

	return foundUser, nil
}

func (this *userRepository) Insert(newUser *models.User) (int64, error) {
	database, tx, err := openDB(this.dbPath)

	if err != nil {
		return -1, err
	}

	result, err := database.Exec(
		"INSERT INTO user (id, id_dropbox, display_name, email, profile_picture, role, token) VALUES (?, ?, ?, ?, ?, ?, ?)",
		newUser.Id,
		newUser.IdDropbox,
		newUser.DisplayName,
		newUser.Email,
		newUser.ProfilePicture,
		newUser.Role,
		newUser.Token,
	)

	if err != nil {
		return -1, err
	}

	tx.Commit()

	return result.LastInsertId()
}

func (this *userRepository) Remove() {}

func (this *userRepository) Update() {}

func openDB(dbPath string) (*sql.DB, *sql.Tx, error) {
	database, err := sql.Open(DB_DRIVER, dbPath)

	if err != nil {
		log.Println("Failed to create the handle")
		return nil, nil, err
	}

	if err2 := database.Ping(); err2 != nil {
		log.Println("Failed to keep connection alive")
		return nil, nil, err
	}

	tx, err := database.Begin()

	if err != nil {
		log.Fatal(err)
		return nil, nil, err
	}

	return database, tx, nil
}

func init() {
	sql.Register(DB_DRIVER, &sqlite3.SQLiteDriver{})
}
