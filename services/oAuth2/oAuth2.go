package oauth2

import (
	"fmt"
	"net/url"
	"net/http"
	"encoding/json"
)

const (
	AUTHORIZATION_URL = "https://www.dropbox.com/1/oauth2/authorize?client_id=%v&response_type=code&redirect_uri=%v"
	TOKEN_EXCHANGE_URL = "https://api.dropbox.com/1/oauth2/token"
)

type Handler struct {
	Key,
	Secret,
	RedirectURL,
	authURL,
	exchangeURL string
}

type Token struct {
	UID   string        `json:"uid"`
	Token string        `json:"access_token"`
	Error *string       `json:"error"`
}

type HttpInterface interface {
	PostForm(string, url.Values) (*http.Response, error)
}

func NewHandler() *Handler {
	return &Handler{
		Key: "6q4z98mh42d8wqd",
		Secret: "rzktu943cdc777r",
		RedirectURL: "http://localhost:3000/login/dropbox/callback",
		authURL: AUTHORIZATION_URL,
		exchangeURL: TOKEN_EXCHANGE_URL,
	}
}

func (h *Handler) GetAuthRedirectUrl() string {
	return fmt.Sprintf(h.authURL, h.Key, h.RedirectURL)
}

func (h *Handler) EndAuth(code string) (*Token, error) {
	data := url.Values{}

	data.Add("code", code)
	data.Add("grant_type", "authorization_code")
	data.Add("client_id", h.Key)
	data.Add("client_secret", h.Secret)
	data.Add("redirect_uri", h.RedirectURL)

	resp, err := http.PostForm(h.exchangeURL, data)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	token := &Token{}

	dec := json.NewDecoder(resp.Body)
	err = dec.Decode(&token)

	return token, nil
}
