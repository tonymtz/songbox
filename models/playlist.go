package models

type Playlist struct {
	Name  string `json:"title,omitempty"`
	Songs []*Song  `json:"songs"`
}
