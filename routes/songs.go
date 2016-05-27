package routes

import (
	"github.com/labstack/echo"
	"github.com/tonymtz/songbox/utils"
	"github.com/tonymtz/songbox/services"
)

//const token = "kf2RS8q3VC4AAAAAAAAdHlhw8DOIECJAjs7ormrD6jdE3qt-T3oFq93OcUjwkx1X"

type SongsRoute interface {
	Get(echo.Context) error
	GetOne(echo.Context) error
}

var Songs SongsRoute

type songsRoute struct {
	SongsRoute
	songsService services.SongsService
}

func (this *songsRoute) Get(ctx echo.Context) error {
	songs, err := this.songsService.Get()

	if err != nil {
		return echo.NewHTTPError(status.INTERNAL_SERVER_ERROR, err.Error())
	}

	return ctx.JSON(status.OK, songs)
}

func (this *songsRoute) GetOne(ctx echo.Context) error {
	path := ctx.Param("path")

	if path == "" {
		return echo.NewHTTPError(status.BAD_REQUEST, "Must provide path")
	}

	song, err := this.songsService.GetOne(path)

	if err != nil {
		return echo.NewHTTPError(status.INTERNAL_SERVER_ERROR, err.Error())
	}

	return ctx.JSON(status.OK, song)
}

func init() {
	Songs = &songsRoute{
		songsService: services.NewSongsService(),
	}
}
