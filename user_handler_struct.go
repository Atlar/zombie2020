package main

import(

    "gopkg.in/gin-gonic/gin.v1"
    "http"

) 

type UserHandler struct{

    *gin.Router

}
func HandleUser( context *gin.Context ){

    context.bindJSON

} 

func HandleLogin( context *gin.Context){

    var LoginInfo LoginForm
    context.bindJSON( &LoginInfo )
    newUser := User{ Name: LoginInfo.Username } 
    context.JSON(http.StatusOK, User)

}

type LoginForm struct {

    Username string `json: "username" `
    Password string `json: "password" `

} 

type RegistrationForm struct {

    Login
    Email `json: "email"`

} 

/*
func handleUser( c *gin.Context ){

    

}
funct ( self *UserHandler ) bindToAddress( address string  ){
    
     self.GET("", self.HandleUser)
  
}
funct ( self *UserHandler ) getHandlers() func
*/