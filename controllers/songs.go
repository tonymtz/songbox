package controllers

import (
	"strings"

	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
	"github.com/stacktic/dropbox"
)

type SongsController struct {
	beego.Controller
}

func (c *SongsController) Prepare() {
	token := c.Ctx.GetCookie("dropbox_token");

	dbProvider := dropbox.NewDropbox()

	dbProvider.SetAppInfo(
		beego.AppConfig.String("dropbox_key"),
		beego.AppConfig.String("dropbox_secret"),
	)

	dbProvider.SetAccessToken(token)

	if token == "" {
		c.Data["json"] = models.Error{Error: "token not found"}
		c.ServeJSON()
		c.StopRun()
	}

	c.Ctx.Input.SetData("dropbox_provider", dbProvider);
}

func (c *SongsController) Get() {
	dbProvider := c.Ctx.Input.GetData("dropbox_provider").(*dropbox.Dropbox)

	metadata, _ := dbProvider.Metadata("songbox", true, false, "", "", 0)

	var songCollection []models.Song

	for _, song := range metadata.Contents {
		newSong := models.Song{
			Path: strings.Replace(song.Path, "/", "~", -1),
			Title: strings.TrimPrefix(song.Path, "/songbox/"),
		}
		songCollection = append(songCollection, newSong)
	}

	c.Data["json"] = songCollection
	c.ServeJSON()
}

func (c *SongsController) GetOne() {
	songPath := c.Ctx.Input.Param(":path")

	if songPath == "" {
		c.Data["json"] = models.Error{Error: "file not found"}
		c.ServeJSON()
		c.StopRun()
	}

	songPath = strings.Replace(songPath, "~", "/", -1)

	dbProvider := c.Ctx.Input.GetData("dropbox_provider").(*dropbox.Dropbox)

	url, err := dbProvider.Media(songPath)

	if err != nil {
		c.Data["json"] = models.Error{Error: "path not given"}
		c.ServeJSON()
		c.StopRun()
	}

	c.Data["json"] = url
	c.ServeJSON()
}
