package main

type Aggregation []ForeignKey

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
	NamedEntry
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
	Entries Aggregation
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
	Entry
	Name string
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
type ContentComponent string
type PublicationStatus int
type PermissionComponent struct {
	SubjectName        string
	SubjectPermissions map[ForeignKey]Permissions
}
type Permissions map[string]bool

func (self *PermissionComponent) CheckPermission(permission string, subject string, subjectId ID) bool {
	checkResult, _ := self.SubjectPermissions[ForeignKey(subjectId)][permission]
	return checkResult
}
func (self *PermissionComponent) AddPermission(permission string, permissionState bool, subject string, subjectId ID) {

	OldPermissions := self.SubjectPermissions[ForeignKey(subjectId)]
	OldPermissions[permission] = permissionState
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

//FriendsComponent
//FollowComponent
//FeedbackComponent
//
