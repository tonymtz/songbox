package controllers

import (
	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
)

var dropboxHandler *models.Dropbox

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	sessionToken := c.Ctx.GetCookie("songbox_token")

	if sessionToken != "" {
		_, err := models.GetUserByToken(sessionToken)

		if err == nil {
			c.Redirect("/app", 302)
		}
	}

	c.Layout = "layout.html"
	c.TplName = "index.tpl"
}

func init() {
	dropboxHandler = models.NewDropbox()
}
