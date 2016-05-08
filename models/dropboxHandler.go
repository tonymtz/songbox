package models

import (
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/config"
	"github.com/tonymtz/go-dropbox"
	"strings"
	"fmt"
	"encoding/json"
	"net/http"
	"bytes"
)

const (
	POST = "POST"
	INVALID_ACCESS_TOKEN = "invalid_access_token"

	// API v1
	MEDIA_URL = "https://api.dropboxapi.com/1/media/auto/"

	// API v2
	LIST_FOLDER_URL = "https://api.dropboxapi.com/2/files/list_folder"
	SEARCH_URL = "https://api.dropboxapi.com/2/files/search/"
	GET_DATA_URL = "https://api.dropboxapi.com/2/users/get_current_account"
)

type Dropbox struct {
	Debug         bool
	Locale        string
	mediaURL      string
	listFolderURL string
	searchURL     string

	getDataURL    string
}

func NewDropbox() *Dropbox {
	return &Dropbox{
		Locale: "en",
		mediaURL: MEDIA_URL,
		listFolderURL: LIST_FOLDER_URL,
		searchURL: SEARCH_URL,
		getDataURL: GET_DATA_URL,
	}
}

func (d *Dropbox) GetData(accessToken string) (*Profile, error) {
	client := &http.Client{}

	encoded, _ := json.Marshal(nil)

	req, _ := http.NewRequest(POST, d.getDataURL, bytes.NewBuffer(encoded))
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %v", accessToken))

	res, _ := client.Do(req)

	defer res.Body.Close()

	profile := &Profile{}

	dec := json.NewDecoder(res.Body)
	_ = dec.Decode(&profile)

	return profile, nil
}

type Profile struct {
	AccountId string `json:"account_id"`
	Name      *ProfileName `json:"name"`
	Email     string `json:"email"`
	Image     string `json:"profile_photo_url,omitempty"`
}

type ProfileName struct {
	DisplayName string `json:"display_name"`
}

//=======================================//
//=======================================//
//=======                         =======//
//======= Deprecate methods below =======//
//=======                         =======//
//=======================================//
//=======================================//

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

		if playlist == "" {
			playlist = "root"
		}

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
