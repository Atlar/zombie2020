package main

import(
	"net/http"
	"gopkg.in/gin-gonic/gin.v1"

)
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
