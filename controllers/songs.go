package controllers

import (
	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
)

const (
	NEED_AUTHENTICATION = "Authentication is required"
	EMPTY_PARAMETER = "Empty Parameter"
)

type SongsController struct {
	beego.Controller
}

func (c *SongsController) Prepare() {
	token := c.Ctx.GetCookie("dropbox_token")

	if token == "" {
		c.Data["json"] = models.Error{Error: NEED_AUTHENTICATION}
		c.ServeJSON()
		c.StopRun()
	}

	dropboxHandler := models.NewDropboxHandler()
	dropboxHandler.Dropbox.SetAccessToken(token)

	c.Ctx.Input.SetData("dropbox_handler", dropboxHandler);
}

func (c *SongsController) Get() {
	dropboxHandler := c.Ctx.Input.GetData("dropbox_handler").(*models.DropboxHandler)

	matches, err := dropboxHandler.GetMusic()

	if err != nil {
		c.Ctx.ResponseWriter.WriteHeader(err.StatusCode)
		c.Data["json"] = models.Error{Error: err.ErrorSummary}
		c.ServeJSON()
		c.StopRun()
	}

	c.Data["json"] = matches
	c.ServeJSON()
}

func (c *SongsController) GetOne() {
	file := c.Ctx.Input.Param(":path")

	if file == "" {
		c.Data["json"] = models.Error{Error: EMPTY_PARAMETER}
		c.ServeJSON()
		c.StopRun()
	}

	dropboxHandler := c.Ctx.Input.GetData("dropbox_handler").(*models.DropboxHandler)

	url, err := dropboxHandler.GetStreamURL(file)

	if err != nil {
		c.Ctx.ResponseWriter.WriteHeader(err.StatusCode)
		c.Data["json"] = models.Error{Error: err.ErrorSummary}
		c.ServeJSON()
		c.StopRun()
	}

	c.Data["json"] = url
	c.ServeJSON()
}
