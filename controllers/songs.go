package controllers

import (
	"github.com/astaxie/beego"
//"github.com/astaxie/beego/orm"
//
//"github.com/tonymtz/songbox/models"
//
//"fmt"
//
//"github.com/stacktic/dropbox"
//	"github.com/astaxie/beego/orm"

	"github.com/tonymtz/songbox/models"
	"github.com/stacktic/dropbox"
)

type SongsController struct {
	beego.Controller
}

func (c *SongsController) Prepare() {
	token := c.Ctx.GetCookie("dropbox_token");

	if token == "" {
		c.Data["json"] = models.Error{Error: "token not found"}
		c.ServeJSON()
		c.StopRun()
	}
}

func (c *SongsController) Get() {
	token := c.Ctx.GetCookie("dropbox_token");

	var dbProvider *dropbox.Dropbox

	dbProvider = dropbox.NewDropbox()

	dbProvider.SetAppInfo(
		beego.AppConfig.String("dropbox_key"),
		beego.AppConfig.String("dropbox_secret"),
	)

	dbProvider.SetAccessToken(token)

	path := c.Ctx.Input.Param(":path")

	if path == "" {
		metadata, _ := dbProvider.Metadata("songbox", true, false, "", "", 0)
		c.Data["json"] = metadata.Contents
	} else {
		url, _ := dbProvider.Media("songbox/" + path)
		c.Data["json"] = url
	}

	c.ServeJSON()
}
