package main

import (
	"github.com/astaxie/beego/migration"
)

// DO NOT MODIFY
type Users_20160329_170013 struct {
	migration.Migration
}

// DO NOT MODIFY
func init() {
	m := &Users_20160329_170013{}
	m.Created = "20160329_170013"
	migration.Register("Users_20160329_170013", m)
}

// Run the migrations
func (m *Users_20160329_170013) Up() {
	// use m.SQL("CREATE TABLE ...") to make schema update
	m.SQL("CREATE TABLE users(`id` int(11) NOT NULL AUTO_INCREMENT,`dropbox_id` varchar(128) NOT NULL,`display_name` varchar(128) NOT NULL,`email` varchar(128) NOT NULL,`profile_photo_url` varchar(128) NOT NULL,PRIMARY KEY (`id`))")
}

// Reverse the migrations
func (m *Users_20160329_170013) Down() {
	// use m.SQL("DROP TABLE ...") to reverse schema update
	m.SQL("DROP TABLE `users`")
}
