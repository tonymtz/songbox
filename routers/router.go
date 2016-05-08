package routers

import (
	"github.com/tonymtz/songbox/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	apiv1 := beego.NewNamespace("/v1",
		beego.NSRouter("/songs", &controllers.SongsController{}),
		beego.NSRouter("/songs/:path", &controllers.SongsController{}, "get:GetOne"),
	)

	beego.AddNamespace(apiv1)

	beego.Router("/app", &controllers.AppController{})

	beego.Router("/login/dropbox", &controllers.LoginController{}, "get:Dropbox")
	beego.Router("/login/dropbox/callback", &controllers.LoginController{}, "get:DropboxCallback")
	beego.Router("/logout", &controllers.LoginController{}, "get:Logout")
}
