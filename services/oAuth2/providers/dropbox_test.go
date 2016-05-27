package providers

import (
	"testing"
	"fmt"
	"net/http"
	"net/http/httptest"
	"github.com/stretchr/testify/assert"
)

func TestDropbox_RedirectUrl(t *testing.T) {
	// Setup

	dropbox := NewDropbox("my_key", "my_secret", "my_redirect")

	// Case

	url := dropbox.RedirectUrl()
	expectedUrl := "https://www.dropbox.com/1/oauth2/authorize?client_id=my_key&response_type=code&redirect_uri=my_redirect"

	assert.Equal(t, url, expectedUrl,
		fmt.Sprintf("Expected same value, got %v, want %v", url, expectedUrl),
	)
}

func TestDropbox_ExchangeToken(t *testing.T) {
	// Setup
	var sampleResponse = `{
		"access_token": "my_unique_token",
		"token_type": "bearer",
		"uid": "12345"
	}`

	testServer := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		fmt.Fprintln(w, sampleResponse)
	}))

	defer testServer.Close()

	myDropbox := NewDropbox("my_key", "my_secret", "my_redirect")
	myDropbox.exchangeURL = testServer.URL

	// Positive case

	token, err := myDropbox.ExchangeToken("my_code")

	if assert.Nil(t, err) {
		c := token.Token
		d := "my_unique_token"

		assert.Equal(t, c, d,
			fmt.Sprintf("Expected same value, got %v, want %v", c, d),
		)
	}
}
