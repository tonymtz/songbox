package routers

import (
	"github.com/tonymtz/songbox/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	apiv1 := beego.NewNamespace("/v1",
		beego.NSRouter("/playlists", &controllers.PlaylistsController{}),

		beego.NSRouter("/songs", &controllers.SongsController{}),
		beego.NSRouter("/songs/:path", &controllers.SongsController{}, "get:GetOne"),
	)

	beego.AddNamespace(apiv1)

	beego.Router("/app", &controllers.AppController{})

	beego.Router("/login", &controllers.LoginController{})
	beego.Router("/login/callback", &controllers.LoginController{}, "get:Callback")
}
