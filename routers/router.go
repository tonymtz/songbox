package routers

import (
	"github.com/tonymtz/songbox/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})

	beego.Router("/v1/songs", &controllers.SongsController{})

	beego.Router("/app", &controllers.AppController{})

	beego.Router("/login", &controllers.LoginController{})
	beego.Router("/login/callback", &controllers.LoginController{}, "get:Callback")
}
