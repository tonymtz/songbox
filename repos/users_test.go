package repos

import (
	"testing"
	"github.com/stretchr/testify/assert"
	"github.com/tonymtz/songbox/conf"
	"github.com/tonymtz/songbox/models"
	"database/sql"
	"errors"
)

var (
	dbPath string

	testUser = &models.User{
		Id: 9,
		IdDropbox: "uid:111111",
		DisplayName: "test user",
		Email: "test@songbox.xyz",
		ProfilePicture: "http://image.url/",
		Role: 1,
		Token: "t11111",
	}

	demoUser = &models.User{
		Id: 12,
		IdDropbox: "uid:222222",
		DisplayName: "demo user",
		Email: "demo@songbox.xyz",
		ProfilePicture: "http://image.net/",
		Role: 1,
		Token: "t22222",
	}
)

func TestUserRepository_Insert(t *testing.T) {
	// Setup
	restartDB()

	userRepo := NewUsersRepository(dbPath)
	userFromDB := &models.User{}

	// Test
	lastId, err := userRepo.Insert(testUser)

	getUser(lastId, userFromDB)

	if assert.Nil(t, err) {
		assert.True(t, lastId > -1, "returned id should be greater than -1")

		assert.EqualValues(t, userFromDB, testUser, "both users should be equals")
	}
}

func TestUserRepository_FindById(t *testing.T) {
	// Setup
	restartDB()

	insertUser(testUser)
	insertUser(demoUser)

	userRepo := NewUsersRepository(dbPath)

	// Test

	userFromRepo, err := userRepo.FindById(12)

	if assert.Nil(t, err) {
		assert.EqualValues(t, userFromRepo, demoUser, "both users should be equals")
	}

	userFromRepo, err = userRepo.FindById(9)

	if assert.Nil(t, err) {
		assert.EqualValues(t, userFromRepo, testUser, "both users should be equals")
	}
}

func TestUserRepository_FindByProviderId(t *testing.T) {
	// Setup
	restartDB()

	insertUser(testUser)
	insertUser(demoUser)

	userRepo := NewUsersRepository(dbPath)

	// Test

	userFromRepo, err := userRepo.FindByProviderId("uid:222222")

	if assert.Nil(t, err) {
		assert.EqualValues(t, userFromRepo, demoUser, "both users should be equals")
	}

	userFromRepo, err = userRepo.FindByProviderId("uid:111111")

	if assert.Nil(t, err) {
		assert.EqualValues(t, userFromRepo, testUser, "both users should be equals")
	}
}

func init() {
	config := conf.Conf["test"]
	dbPath = "../database/" + config.DatabaseName
}

func getUser(id int64, user *models.User) error {
	database, _, err := openDB(dbPath)

	if err != nil {
		return err
	}

	err = database.QueryRow(
		"SELECT id, id_dropbox, display_name, email, profile_picture, role, token FROM user WHERE id=?",
		id,
	).Scan(
		&user.Id,
		&user.IdDropbox,
		&user.DisplayName,
		&user.Email,
		&user.ProfilePicture,
		&user.Role,
		&user.Token,
	)

	if err == sql.ErrNoRows {
		return errors.New("No user with that ID.")
	}

	if err != nil {
		return err
	}

	return nil
}

func insertUser(user *models.User) error {
	database, tx, err := openDB(dbPath)

	if err != nil {
		return err
	}

	_, err = database.Exec(
		"INSERT INTO user (id, id_dropbox, display_name, email, profile_picture, role, token) VALUES (?, ?, ?, ?, ?, ?, ?)",
		user.Id,
		user.IdDropbox,
		user.DisplayName,
		user.Email,
		user.ProfilePicture,
		user.Role,
		user.Token,
	)

	if err != nil {
		return err
	}

	tx.Commit()

	return nil
}

func restartDB() error {
	database, tx, err := openDB(dbPath)

	if err != nil {
		return err
	}

	_, err = database.Exec(
		"DELETE FROM user;VACUUM;DELETE FROM sqlite_sequence",
	)

	if err != nil {
		return err
	}

	tx.Commit()

	return nil
}
