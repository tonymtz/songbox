package routes

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/labstack/echo"
	"github.com/labstack/echo/engine/standard"
	"github.com/tonymtz/songbox/test_utils/mocks"
)

func TestSongsRoute_Get(t *testing.T) {
	// Setup
	e := echo.New()
	req := new(http.Request)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(standard.NewRequest(req, e.Logger()), standard.NewResponse(rec, e.Logger()))

	SongsServiceMock := &mocks.SongsServiceMock{}

	SongsRoute := &songsRoute{
		songsService: SongsServiceMock,
	}

	// Positive test

	if err := SongsRoute.Get(ctx); err != nil {
		t.Error(err)
	}

	// Negative test

	SongsServiceMock.IsNegative = true
	if err := SongsRoute.Get(ctx); err == nil {
		t.Error(err)
	}
}

func TestSongsRoute_GetOne(t *testing.T) {
	// Setup
	e := echo.New()
	req := new(http.Request)
	rec := httptest.NewRecorder()
	ctx := e.NewContext(standard.NewRequest(req, e.Logger()), standard.NewResponse(rec, e.Logger()))
	ctx.SetParamNames("path")
	ctx.SetParamValues("/my/song.mp3")

	SongsServiceMock := &mocks.SongsServiceMock{}

	SongsRoute := &songsRoute{
		songsService: SongsServiceMock,
	}

	// Positive test

	if err := SongsRoute.GetOne(ctx); err != nil {
		t.Error(err)
	}

	// Negative test

	SongsServiceMock.IsNegative = true
	if err := SongsRoute.GetOne(ctx); err == nil {
		t.Error(err)
	}

	// Negative test

	ctx.SetParamValues("")
	if err := SongsRoute.GetOne(ctx); err == nil {
		t.Error(err)
	}
}
