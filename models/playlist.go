package models

type Playlist struct {
	UID  string `json:"id,omitempty"`
	Name string `json:"name,omitempty"`
	Path string `json:"path_display,omitempty"`
}
