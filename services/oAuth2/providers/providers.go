package providers

type Provider interface {
	RedirectUrl() string
	ExchangeToken(string) (*Token, error)
}

type Token struct {
	UID   string        `json:"uid"`
	Token string        `json:"access_token"`
	Error *string       `json:"error"`
}
