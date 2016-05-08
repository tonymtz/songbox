package controllers

import (
	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
	"os"
)

type AppController struct {
	beego.Controller
}

func (c *AppController) Get() {
	sessionToken := c.Ctx.GetCookie("songbox_token")

	if sessionToken == "" {
		c.Redirect("/", 302)
	} else {
		_, err := models.GetUserByToken(sessionToken)

		if err != nil {
			c.Redirect("/", 302)
		}
	}

	runMode := os.Getenv("BEEGO_RUNMODE")

	c.Data["isProd"] = runMode == "prod"

	c.Layout = "layout.html"
	c.TplName = "app.tpl"
}
