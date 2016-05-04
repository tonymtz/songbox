package models

type Song struct {
	Title string `json:"title,omitempty"`
	Path  string `json:"path,omitempty"`
}

type Playlist struct {
	Name  string `json:"title,omitempty"`
	Songs []*Song  `json:"songs"`
}
