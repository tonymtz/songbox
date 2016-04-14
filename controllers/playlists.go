package controllers

import (
	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
)

type PlaylistsController struct {
	beego.Controller
}

func (p *PlaylistsController) Prepare() {
	token := p.Ctx.GetCookie("dropbox_token")

	if token == "" {
		p.Data["json"] = models.Error{Error: NEED_AUTHENTICATION}
		p.ServeJSON()
		p.StopRun()
	}

	dropboxHandler := models.NewDropboxHandler()
	dropboxHandler.Dropbox.SetAccessToken(token)

	p.Ctx.Input.SetData("dropbox_handler", dropboxHandler);
}

func (p *PlaylistsController) Get() {
	dropboxHandler := p.Ctx.Input.GetData("dropbox_handler").(*models.DropboxHandler)

	playlists, err := dropboxHandler.GetFolders()

	if err != nil {
		p.Ctx.ResponseWriter.WriteHeader(err.StatusCode)
		p.Data["json"] = models.Error{Error: err.ErrorSummary}
		p.ServeJSON()
		p.StopRun()
	}

	p.Data["json"] = playlists
	p.ServeJSON()
}
