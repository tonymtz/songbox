package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/config"
	"github.com/tonymtz/go-dropbox"
	"strings"
)

type DropboxHandler struct {
	Dropbox         *go_dropbox.Dropbox
	Token           *go_dropbox.Token
	isAuthenticated bool
}

func NewDropboxHandler() *DropboxHandler {
	iniconf, err := config.NewConfig("ini", "conf/dropbox.conf")

	if err != nil {
		beego.Error(err)
	}

	db := go_dropbox.NewDropbox()
	db.SetAppInfo(
		iniconf.String("dropbox_key"),
		iniconf.String("dropbox_secret"),
		beego.AppConfig.String("dropbox_redirect_url"),
	)

	return &DropboxHandler{
		Dropbox: db,
	}
}

func (dbh *DropboxHandler) IsAuthenticated() bool {
	return dbh.isAuthenticated
}

func (dbh *DropboxHandler) BeginAuth() string {
	return dbh.Dropbox.GetAuthURL()
}

func (dbh *DropboxHandler) EndAuth(code string) error {
	var err error

	dbh.Token, err = dbh.Dropbox.ExchangeToken(code)

	if dbh.Token.Error != nil {
		return err
	}

	if err != nil {
		return err
	}

	dbh.isAuthenticated = true

	return nil
}

// DEPRECATED
func (dbh *DropboxHandler) GetFolder() (*go_dropbox.Folder, *go_dropbox.DropboxError) {
	//dbh.Dropbox.Debug = true
	folder, err := dbh.Dropbox.ListFolder()

	if err != nil {
		return nil, err
	}

	var filteredEntries []*go_dropbox.Entry

	for _, entry := range folder.Entries {
		if strings.HasSuffix(entry.Path, ".mp3") {
			filteredEntries = append(filteredEntries, entry)
		}
	}

	filteredFolder := &go_dropbox.Folder{
		Entries: filteredEntries,
		HasMore: folder.HasMore,
		Cursor: folder.Cursor,
	}

	return filteredFolder, nil
}

func (dbh *DropboxHandler) GetStreamURL(file string) (*go_dropbox.SharedURL, *go_dropbox.DropboxError) {
	//dbh.Dropbox.Debug = true
	file = strings.Replace(file, "~", "/", -1)
	return dbh.Dropbox.GetMediaURL(file)
}

type playlistResponse struct {
	Playlists []*Playlist `json:"playlists"`
}

func (dbh *DropboxHandler) GetMusic() (*playlistResponse, *go_dropbox.DropboxError) {
	//dbh.Dropbox.Debug = true
	search, err := dbh.Dropbox.SearchMusic()

	if err != nil {
		return nil, err
	}

	songsMap := make(map[string][]*Song)

	for _, entry := range search.Matches {
		path := strings.Split(entry.Metadata.Path, "/")

		mySong := &Song{
			Title: entry.Metadata.Name,
			Path: entry.Metadata.Path,
		}

		playlist := path[len(path) - 2];
		songsMap[playlist] = append(songsMap[playlist], mySong)
	}

	var playlistCollection []*Playlist

	for playlistName, songs := range songsMap {
		newPlaylist := &Playlist{
			Name: playlistName,
			Songs: songs,
		}

		playlistCollection = append(playlistCollection, newPlaylist)
	}

	playlistResponse := &playlistResponse{
		Playlists: playlistCollection,
	}

	return playlistResponse, nil
}
