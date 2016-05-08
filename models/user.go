package models

import (
	"github.com/astaxie/beego/orm"
)

// USER ROLES:
// 0 - admin
// 1 - registered

type User struct {
	Id             int64 `json:"id" orm:"auto;pk"`
	IdDropbox      string `json:"id_dropbox"`
	DisplayName    string `json:"display_name"`
	Email          string `json:"email"`
	ProfilePicture string `json:"profile_picture"`
	Role           int64 `json:"role,omitempty"`
	Token          string `json:"token,omitempty"`
}

func init() {
	orm.RegisterModel(new(User))
}

/*
 * Save insert a new User into database and returns last inserted Id on success.
 */
func SaveUser(u *User) (id int64, err error) {
	//m.CreatedAt = time.Now().Unix()
	o := orm.NewOrm()
	id, err = o.Insert(u)
	return
}

/*
 * GetById retrieves User by Id. Returns error if Id doesn't exist
 */
func GetUserById(id int64) (user *User, err error) {
	o := orm.NewOrm()

	user = &User{Id: id}

	err = o.Read(user)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func GetUserByIdDropbox(profileId string) (user *User, err error) {
	o := orm.NewOrm()

	user = &User{IdDropbox:profileId}

	err = o.Read(user, "IdDropbox")

	if err != nil {
		return nil, err
	}

	return user, nil
}

func GetUserByToken(sessionToken string) (user *User, err error) {
	o := orm.NewOrm()

	user = &User{Token: sessionToken}

	err = o.Read(user, "Token")

	if err != nil {
		return nil, err
	}

	return user, nil
}

func UpdateUser(oldUser *User) {
	o := orm.NewOrm()

	user := &User{Id: oldUser.Id}

	err := o.Read(user)

	if err == nil {
		user.Token = oldUser.Token

		if _, err := o.Update(user); err == nil {
		}
	}
}

func RegisterNewUser(profileFromDropbox *Profile) int64 {
	imageProfile := profileFromDropbox.Image;

	if imageProfile == "" {
		imageProfile = "http://i.imgur.com/7eXwpwB.png"
	}

	newUser := &User{
		IdDropbox: profileFromDropbox.AccountId,
		DisplayName: profileFromDropbox.Name.DisplayName,
		Email: profileFromDropbox.Email,
		ProfilePicture: imageProfile,
		Role: 1,
	}

	id, _ := SaveUser(newUser)

	return id
}
