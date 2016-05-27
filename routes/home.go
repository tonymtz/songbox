package routes

import (
	"github.com/labstack/echo"
	"github.com/tonymtz/songbox/utils"
)

type HomeRoute struct {
	Route
}

func (this *HomeRoute) Get(ctx echo.Context) error {
	return ctx.String(status.OK, "Hello, World!")
}
