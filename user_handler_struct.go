package main

import(

    "gopkg.in/gin-gonic/gin.v1"
    "net/http"

)

func HandleLogin( context *gin.Context){

    var LoginInfo LoginForm
    context.BindJSON( &LoginInfo )
    newUser := User{ Name: LoginInfo.Username } 
    context.JSON(http.StatusOK, newUser)

}

type LoginForm struct {

    Username string `json: "username"`
    Password string `json: "password"`

} 

type RegistrationForm struct {

    LoginForm
    Email string `json: "email"`

} 

/*
func handleUser( c *gin.Context ){

    

}
funct ( self *UserHandler ) bindToAddress( address string  ){
    
     self.GET("", self.HandleUser)
  
}
funct ( self *UserHandler ) getHandlers() func
*/