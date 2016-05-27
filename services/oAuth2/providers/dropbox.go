package providers

import (
	"fmt"
	"net/url"
	"encoding/json"
	"net/http"
)

type Dropbox struct {
	Provider,
	Key         string
	Secret      string
	RedirectURL string
	exchangeURL string
	authURL     string
}

func (this *Dropbox) RedirectUrl() string {
	return fmt.Sprintf(this.authURL, this.Key, this.RedirectURL)
}

func (this *Dropbox) ExchangeToken(code string) (*Token, error) {
	data := url.Values{}

	data.Add("code", code)
	data.Add("grant_type", "authorization_code")
	data.Add("client_id", this.Key)
	data.Add("client_secret", this.Secret)
	data.Add("redirect_uri", this.RedirectURL)

	resp, err := http.PostForm(this.exchangeURL, data)

	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	token := &Token{}

	dec := json.NewDecoder(resp.Body)
	err = dec.Decode(&token)

	return token, nil
}

func NewDropbox(key, secret, redirectUrl string) *Dropbox {
	return &Dropbox{
		Key: key,
		Secret: secret,
		RedirectURL: redirectUrl,
		authURL: "https://www.dropbox.com/1/oauth2/authorize?client_id=%v&response_type=code&redirect_uri=%v",
		exchangeURL: "https://api.dropbox.com/1/oauth2/token",
	}
}
