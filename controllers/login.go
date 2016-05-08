package controllers

import (
	"github.com/astaxie/beego"
	"github.com/tonymtz/songbox/models"
	"github.com/tonymtz/songbox/models/oAuth2"
	"fmt"
	"crypto/rand"
)

var oAuth2Handler *oAuth2.Handler

type LoginController struct {
	beego.Controller
}

func (c *LoginController) Logout() {
	c.Ctx.SetCookie("songbox_token", "thank you, bye!")

	c.Redirect("/", 302)
}

func (c *LoginController) Dropbox() {
	authcode := c.GetString("code")

	if authcode == "" {
		c.Redirect(oAuth2Handler.BeginAuth(), 302)
		return
	}
}

func (c *LoginController) DropboxCallback() {
	var err error

	code := c.GetString("code")

	token, err := oAuth2Handler.EndAuth(code)

	if err != nil {
		fmt.Println(err)
		return
	}

	profileFromDropbox := getProfile(token.Token)

	if profileFromDropbox != nil {
		var user *models.User

		user, _ = models.GetUserByIdDropbox(profileFromDropbox.AccountId)

		if user == nil {
			id := models.RegisterNewUser(profileFromDropbox);

			user, _ = models.GetUserById(id)
		}

		user.Token = randToken()

		models.UpdateUser(user)

		c.Ctx.SetCookie("songbox_token", user.Token)
	} else {
		fmt.Println("Weird Error!")
		return
	}

	c.Redirect("/", 302)
}

func init() {
	oAuth2Handler = oAuth2.NewHandler()
}

func getProfile(token string) *models.Profile {
	profile, _ := dropboxHandler.GetData(token)
	return profile
}

func randToken() string {
	b := make([]byte, 128)
	rand.Read(b)
	return fmt.Sprintf("%x", b)
}
