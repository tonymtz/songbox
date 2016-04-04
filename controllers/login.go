package controllers

import (
	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
	"fmt"
)

var dropboxHandler *models.DropboxHandler

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Get() {
	authcode := c.GetString("code")

	if authcode == "" {
		c.Redirect(dropboxHandler.BeginAuth(), 302)
		return
	}
}

func (c *LoginController) Callback() {
	var err error

	code := c.GetString("code")

	err = dropboxHandler.EndAuth(code)

	if err != nil {
		// TODO - handle this
		fmt.Println(err)
		return
	}

	// TODO - avoid send token/uid
	c.Ctx.SetCookie("dropbox_token", dropboxHandler.Token.Token)
	c.Ctx.SetCookie("dropbox_uid", dropboxHandler.Token.UID)

	c.Redirect("/app/", 302)
}

func init() {
	dropboxHandler = models.NewDropboxHandler()
}
