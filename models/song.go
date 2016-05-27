package models

type Song struct {
	Title     string `json:"title,omitempty"`
	Path      string `json:"path,omitempty"`
	StreamUrl string `json:"stream_url,omitempty"`
}
