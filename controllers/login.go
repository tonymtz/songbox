package controllers

import (
	"github.com/astaxie/beego"
	"fmt"

	"github.com/tonymtz/goauth-dropbox/dropboxOAuth"
	//"github.com/stacktic/dropbox"
	//"github.com/tonymtz/songbox/models"
)

var dropboxHandler *dropboxOAuth.OAuth2Handler

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Get() {
	//c.Ctx.R
	//o := orm.NewOrm()
	//
	//var users []models.Users
	//num, err := o.QueryTable(new(models.Users)).All(&users)
	//
	//if err != orm.ErrNoRows && num > 0 {
	//	c.Data["Users"] = users
	//} else {
	//	fmt.Println(err)
	//}
	//
	//c.Data["Website"] = "beego.me"
	//c.Data["Email"] = "astaxie@gmail.com"
	//c.TplName = "index.tpl"

	authcode := c.GetString("code")

	fmt.Println(dropboxHandler.AuthorizeURL())

	if authcode == "" {
		c.Redirect(dropboxHandler.AuthorizeURL(), 302)
		return
	}
}

func (c *LoginController) Callback() {
	var err error

	authcode := c.GetString("code")

	token, err := dropboxHandler.TokenExchange(authcode)

	if err != nil {
		fmt.Println(err)
		return
	}

	//dbProvider := dropbox.NewDropbox()
	//
	//dbProvider.SetAppInfo(
	//	beego.AppConfig.String("dropbox_key"),
	//	beego.AppConfig.String("dropbox_secret"),
	//)
	//
	//dbProvider.SetAccessToken(token)
	//
	//info, err := dbProvider.GetAccountInfo()
	//
	//if err != nil {
	//	fmt.Println(err)
	//	return
	//}
	//
	//user := models.Users{
	//	DropboxId: info.UID,
	//	DisplayName: info.DisplayName,
	//}
	//
	//models.AddUsers(user)

	c.Ctx.SetCookie("dropbox_token", token.Token)
	c.Ctx.SetCookie("dropbox_uid", token.UID)

	c.Redirect("/app/", 302)
}

func init() {
	dropboxHandler = &dropboxOAuth.OAuth2Handler{
		Key: beego.AppConfig.String("dropbox_key"),
		Secret: beego.AppConfig.String("dropbox_secret"),
		RedirectURI: "http://localhost:8080/login/callback",
	}
}