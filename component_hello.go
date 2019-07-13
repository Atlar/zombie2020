//package component_approach


/*
import(

"fmt"
	"net/http"
	"os"

	"math/rand"

	"gopkg.in/gin-gonic/gin.v1"

	"github.com/Atlar/golang-gin-realworld-example-app/articles"
	"github.com/Atlar/golang-gin-realworld-example-app/users"
	"github.com/jinzhu/gorm"

	//My
	"github.com/Atlar/golang-gin-realworld-example-app/database_agent"

) 


type bookshelf struct {

   user.UserHandler
   articles.ArticledHandler
   database_agent.MongoAgent
   gin.Router
  
   user.UserValidator
   article.ArticleValidator
  
   user.UserSerializer
   article.ArticleSerializer
   
}

type UserHandler struct{

}

type UserWithGinRouter interface{
  
   GetGinRouteGroup() gin.RouterGroup
   GetUserHandler() func() 
 
} 

func (self *UserWithGinRouter) HookUserAPI(){
   
    group := self.GetGinRouteGroup()
    group.GET( "/user/:name", self.HandleUser )
    group.POST( "/register", self.RegisterHandle) 

} 

func StartServer(){

    var Server bookshelf
    
    bookshelf.InitDB()
    bookshelf.HookUserAPI()
    bookshelf.HookArticlesAPI()
    bookshelf.Run()

}

func (self *gin.Router) InitStatic( relative string, diskAddress string){

    self

}
*/