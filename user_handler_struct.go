package main

import (
	"net/http"

	"strconv" //for Atoi conv

	"gopkg.in/gin-gonic/gin.v1"
)

func HandleLogin(context *gin.Context) {

	var LoginInfo LoginForm
	context.BindJSON(&LoginInfo)
	newUser := User{Name: LoginInfo.Username}
	context.JSON(http.StatusOK, newUser)

}

type LoginForm struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type RegistrationForm struct {
	LoginForm
	Email string `json:"email"`
}

func HandleAddProject(context *gin.Context) {

	userId := context.Param("id")
	userIdint, _ := strconv.Atoi(userId)

	var ProjectInfo Project
	context.BindJSON(&ProjectInfo)
	newProject := ProjectInfo
	//newProject.Participants.Participants = append([]ID(newProject.Participants.Participants), ID(userIdint))
	newProject.Participants.Participants = append([]ID(newProject.Participants.Participants), ID(userIdint))
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, newProject)

}

func HandleGetProjects(context *gin.Context) {

	userId := context.Param("id")
	userIdint, _ := strconv.Atoi(userId)
	var Projects []Project
	Projects = []Project{
		Project{
			Name:         "Server sideproject",
			Participants: Participation{[]ID{ID(userIdint)}},
		},
	}
	context.Header("Content-Type", "application/json")
	context.JSON(http.StatusOK, Projects)

}

/*
func handleUser( c *gin.Context ){



}
funct ( self *UserHandler ) bindToAddress( address string  ){

     self.GET("", self.HandleUser)

}
funct ( self *UserHandler ) getHandlers() func
*/
