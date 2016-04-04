package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/config"
	"github.com/tonymtz/go-dropbox"
)

type DropboxHandler struct {
	Dropbox         *go_dropbox.Dropbox
	Token           *go_dropbox.Token
	isAuthenticated bool
}

func NewDropboxHandler() *DropboxHandler {
	iniconf, err := config.NewConfig("ini", "conf/dropbox.conf")

	if err != nil {
		beego.Error(err)
	}

	db := go_dropbox.NewDropbox()
	db.SetAppInfo(
		iniconf.String("dropbox_key"),
		iniconf.String("dropbox_secret"),
		beego.AppConfig.String("dropbox_redirect_url"),
	)

	return &DropboxHandler{
		Dropbox: db,
	}
}

func (dbh *DropboxHandler) IsAuthenticated() bool {
	return dbh.isAuthenticated
}

func (dbh *DropboxHandler) BeginAuth() string {
	return dbh.Dropbox.GetAuthURL()
}

func (dbh *DropboxHandler) EndAuth(code string) error {
	var err error

	dbh.Token, err = dbh.Dropbox.ExchangeToken(code)

	if dbh.Token.Error != nil {
		return err
	}

	if err != nil {
		return err
	}

	dbh.isAuthenticated = true

	return nil
}

func (dbh *DropboxHandler) GetFolder() (*go_dropbox.Folder, *go_dropbox.DropboxError) {
	return dbh.Dropbox.ListFolder()
}

func (dbh *DropboxHandler) GetShareableURL(file string) (*go_dropbox.SharedURL, *go_dropbox.DropboxError) {
	return dbh.Dropbox.GetURL(file)
}

func (dbh *DropboxHandler) ekis() {}
