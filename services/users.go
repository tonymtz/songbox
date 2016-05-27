package services

type UsersService interface {
	Create()
	Get()
}

type usersService struct {
	UsersService
}

var Users UsersService

func init() {
	Users = &usersService{}
}

func (s *usersService) Create() {}

func (s *usersService) Get() {}
