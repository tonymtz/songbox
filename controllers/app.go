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
)

type AppController struct {
	beego.Controller
}

func (c *AppController) Get() {
	c.Layout = "layout.html"
	c.TplName = "app.tpl"
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
	//
	//// ===
	//
	////var err error
	//var db *dropbox.Dropbox
	//
	//var token string
	//
	//token = c.Ctx.GetCookie("dropbox_token")
	//
	//// 1. Create a new dropbox object.
	//db = dropbox.NewDropbox()
	//
	//// 2. Provide your clientid and clientsecret (see prerequisite).
	//db.SetAppInfo(beego.AppConfig.String("dropbox_key"), beego.AppConfig.String("dropbox_secret"))
	//
	//// 3. Provide the user token.
	//db.SetAccessToken(token)
	//
	//// 4. Send your commands.
	//// In this example, you will create a new folder named "demo".
	//folder := "songbox"
	//
	//if _, err = db.CreateFolder(folder); err != nil {
	//	fmt.Printf("Error creating folder %s: %s\n", folder, err)
	//} else {
	//	fmt.Printf("Folder %s successfully created\n", folder)
	//}
}
