package main

import "github.com/tonymtz/songbox/server"

func main() {
	server.Config()
}

//import (
//	_ "github.com/tonymtz/songbox/routers"
//
//	"github.com/astaxie/beego"
//	"github.com/astaxie/beego/orm"
//
//	_ "github.com/mattn/go-sqlite3"
//	"os"
//)
//
//func init() {
//	var err error
//
//	// Database
//	err = orm.RegisterDriver("sqlite3", orm.DRSqlite)
//	if err != nil {
//		beego.Error(err)
//	}
//	err = orm.RegisterDataBase("default", "sqlite3", "database/songbox.db")
//	if err != nil {
//		beego.Error(err)
//	}
//}
//
//func main() {
//	runMode := os.Getenv("BEEGO_RUNMODE")
//
//	if runMode == "prod" {
//		beego.BConfig.RunMode = "prod"
//	}
//
//	beego.Run()
//}

//bee generate scaffold users -fields="dropbox_id:string,display_name:string,email:string,profile_photo_url:string" -driver="sqlite"
//-fields="title:string,body:text"

//CREATE TABLE users (
//user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
//dropbox_id TEXT NOT NULL,
//display_name TEXT NOT NULL,
//email TEXT NOT NULL,
//profile_photo_url TEXT NOT NULL );
