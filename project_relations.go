package main

type Aggregation []ForeignKey
type AggregationOfId []string

func (self *Aggregation) AddToAggregation(EntityId ID) {

	(*self) = append([]ForeignKey((*self)), ForeignKey(EntityId))

}

//
func (self *Aggregation) AddToAggregationField() {

}

//
/*
r.POST("/project/:id/user", Api.Engine.GenerateHandlerAggregation( Api.Projects.AddToAggregation, Api.Users.Users ) )
func ( engine *gin.Engine )GenerateHandlerAggregation( action func( ID, ID ), entities []ID ){

	AggregationId, EntityId := engine.PrepareDataAggregation()
	action( EntityId )
	engine.SendResponse()

}*/
type Project struct {
	NamedEntry `bson:"namedentry"`
	DescriptionComponent
	PermissionComponent
	UsersComponent
	EntriesComponent
	PrivacyComponent
}
type ProjectsComponent struct {
	Projects Aggregation
}
type UsersComponent struct {
	Users Aggregation
}
type EntriesComponent struct {
	Entries AggregationOfId
}
type UserApi struct {
	NamedEntry
	PrivacyComponent
	AuthenticationComponent
}
type Group struct {
	NamedEntry
	PermissionComponent
	UsersComponent
	PrivacyComponent
}
type Entry struct {
	Id ID
	HistoryStamps
}
type NamedEntry struct {
	Name string `bson:"name"`
}
type ForeignKey ID //use to get relation data
func (key *ForeignKey) Related(Entries []Entry) Entry {

	return Entries[int(*key)]

}

type DescriptionComponent string
type ProjectEntry struct {
	NamedEntry
	ContentComponent //edit and update
	PublicationStatus
	PermissionComponent //user edit

}
type ContentComponent struct {
	Text string
}
type PublicationStatus int
type PermissionComponent struct {
	SubjectName string
	PermissionsArray
}
type Permissions map[string]bool
type PermissionsById struct {
	Id ForeignKey
	Permissions
}
type PermissionsArray []PermissionsById

func (self *PermissionComponent) CheckPermission(permission string, subject string, subjectId ID) bool {

	PermissionsInstance := self.PermissionsArray.FindById(subjectId)
	checkResult, _ := PermissionsInstance.Permissions[permission]

	return checkResult

}
func (self *PermissionComponent) AddPermission(permission string, permissionState bool, subjectId ID) {

	PermissionsInstance := self.PermissionsArray.FindById(subjectId)
	PermissionsInstance.Permissions[permission] = permissionState
	//SubjectPermissions[ForeignKey(subjectId)] = Permissions( append( []string( OldPermissions ), permission ) )

}

type AuthenticationComponent struct {
	passwordhash string
	email        string
	loginHistory
}
type loginHistory struct {
	LastLogin int64
	LastIP    string
}
type PrivacyComponent struct {
	PrivacyStatus string
}

func (self *PrivacyComponent) CanView(actionName string, viewer Viewer) bool {

	if self.PrivacyStatus == "private" {
		return false
	}

	return false

}

type Viewer interface {

	//GetPermissions()
	//GetFriendship()
	//FollowComponent?

}

//find
func (self *PermissionsArray) FindById(Id ID) *PermissionsById {

	for _, v := range []PermissionsById(*self) {

		if v.Id == ForeignKey(Id) {

			return &v

		}

	}

	return nil

}

//FriendsComponent
//FollowComponent
//FeedbackComponent
//
