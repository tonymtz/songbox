package services

import "github.com/tonymtz/songbox/models"

type SongsService interface {
	Get() ([]*models.Playlist, error)
	GetOne(string) (*models.Song, error)
}

type songsService struct {
	SongsService
}

func NewSongsService() SongsService {
	return &songsService{}
}

func (s *songsService) Get() (playlists []*models.Playlist, err error) {
	mySong := &models.Song{
		Title: "my song",
		Path: "/my/song.mp3",
	}

	playlists = append(playlists, &models.Playlist{
		Songs: []*models.Song{mySong},
	})

	return playlists, nil
}

func (s *songsService) GetOne(path string) (song *models.Song, err error) {
	mySong := &models.Song{
		Title: "my song",
		Path: path,
		StreamUrl: "http://stream.url/path",
	}

	return mySong, nil
}
