package mocks

import (
	"github.com/tonymtz/songbox/services"
	"github.com/tonymtz/songbox/models"
	"errors"
)

type SongsServiceMock struct {
	services.SongsService
	IsNegative bool
}

func (s *SongsServiceMock) Get() (playlists []*models.Playlist, err error) {
	if s.IsNegative {
		return nil, errors.New("Something went wrong")
	}

	mySong := &models.Song{
		Title: "my song",
		Path: "/my/song.mp3",
	}

	playlists = append(playlists, &models.Playlist{
		Songs: []*models.Song{mySong},
	})

	return playlists, nil
}

func (s *SongsServiceMock) GetOne(path string) (song *models.Song, err error) {
	if s.IsNegative {
		return nil, errors.New("Something went wrong")
	}

	mySong := &models.Song{
		Title: "my song",
		Path: path,
		StreamUrl: "http://stream.url/path",
	}

	return mySong, nil
}
