package server

import (
	"github.com/labstack/echo"
	"github.com/tonymtz/songbox/routes"
)

func router(e *echo.Echo) {
	/*
	 * Home
	 */
	e.Static("/", "static")
	e.File("/app", "static/app.html")

	/*
	 * Login
	 */
	login := &routes.LoginRoute{}
	e.GET("/login/:provider", login.Get)
	e.GET("/login/:provider/callback", login.Callback)

	/*
	 * Songs
	 */
	e.GET("/v1/songs", routes.Songs.Get)
	e.GET("/v1/songs/:path", routes.Songs.GetOne)

	/*
	 * Test
	 */
	home := &routes.HomeRoute{}
	e.GET("/test", home.Get)
}
