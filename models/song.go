package models

type Song struct {
	Title string `json:"title,omitempty"`
	Path  string `json:"path,omitempty"`
}
