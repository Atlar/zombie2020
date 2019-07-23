package main

import (
	"net/http"

	"gopkg.in/gin-gonic/gin.v1"
)

type ServerEngine struct {
	*gin.Engine
}

func (self *ServerEngine) GenerateHandlerSimple(action func(context *gin.Context) interface{}) gin.HandlerFunc {

	return func(c *gin.Context) {

		response := action(c)
		c.JSON(http.StatusOK, response)

	}

}

/*
func (self *gin.Engine) GenerateGetHandler( parameterNameId, parameterNameType string ,action func(), dbobject DBprovider ) gin.HandlerFunction {

	return func( context *gin.Context ){

		id := context.Param(parameterNameId)
		typeObject := context.Param(parameterNameType)
		db := dbobject.
		result := action( parameters )
		context.JSON( http.StatusOK, result )

	}

}
type DBprovider interface{

	GetDB

}
*/
