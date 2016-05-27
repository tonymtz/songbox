package routes

import (
	"log"

	"github.com/labstack/echo"

	"github.com/tonymtz/songbox/utils"
	"github.com/tonymtz/songbox/services/oauth2/providers"
)

var myProviders map[string]providers.Provider

type LoginRoute struct {
	Route
}

func (this *LoginRoute) Get(ctx echo.Context) error {
	provider := ctx.Param("provider")

	if p, ok := myProviders[provider]; ok {
		return ctx.Redirect(status.FOUND, p.RedirectUrl())
	}

	return ctx.String(status.NOT_FOUND, "Unknown provider")
}

func (this *LoginRoute) Callback(ctx echo.Context) error {
	code := ctx.QueryParam("code")

	if code == "" {
		return ctx.String(status.BAD_REQUEST, "Must provide a code")
	}

	provider := ctx.Param("provider")

	if p, ok := myProviders[provider]; ok {
		token, err := p.ExchangeToken(code)

		if err != nil {
			return ctx.String(status.INTERNAL_SERVER_ERROR, "Exchange token error")
		}

		log.Println(token.Token) // TODO - remove this

		// FACT: token exists

		//  gather provider.profile information from provider
		//  if provider.profile data exists
		//      user.getByProviderId(provider.profile.provider_id) in our database
		//      generate custom.token
		//      if models.user exists
		//          update models.user with new provider.token & custom.token
		//      else if models.user doesn't exist
		//          create new models.user with provider.profile & provider.token & custom.token
		//      set cookie with custom.token
		//      redirect to "/app"
		//  else if provider.profile doesn't exist
		//      return error! < weird case
	}

	return ctx.String(200, provider + " " + code)
}

func init() {
	myProviders = make(map[string]providers.Provider)

	myProviders["dropbox"] = providers.NewDropbox(
		"6q4z98mh42d8wqd",
		"rzktu943cdc777r",
		"http://localhost:3000/login/dropbox/callback",
	)
}
