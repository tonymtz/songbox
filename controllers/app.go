package controllers

import (
	"github.com/astaxie/beego"
	"os"
)

type AppController struct {
	beego.Controller
}

func (c *AppController) Get() {
	runMode := os.Getenv("BEEGO_RUNMODE")

	c.Data["isProd"] = runMode == "prod"

	c.Layout = "layout.html"
	c.TplName = "app.tpl"
}
