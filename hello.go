package main

import (
	"fmt"
	"net/http"
	"os"

	"math/rand"

	"gopkg.in/gin-gonic/gin.v1"

	"github.com/Atlar/golang-gin-realworld-example-app/articles"
	"github.com/Atlar/golang-gin-realworld-example-app/users"
	"github.com/jinzhu/gorm"
	"github.com/Atlar/golang-gin-realworld-example-app/common"

	//My
	"github.com/Atlar/golang-gin-realworld-example-app/database_agent"
)

func Migrate(db *gorm.DB) {
	users.AutoMigrate()
	db.AutoMigrate(&articles.ArticleModel{})
	db.AutoMigrate(&articles.TagModel{})
	db.AutoMigrate(&articles.FavoriteModel{})
	db.AutoMigrate(&articles.ArticleUserModel{})
	db.AutoMigrate(&articles.CommentModel{})
}

func main() {

	/////////////
	//Port := os.Getenv("PORT")
	//var db database_agent.MongoAgent

//worked
	//database_agent.Init(&database_agent.DBagent)
	
	//component mongo
	common.InitDB()
	
	//db := common.Init()
	//database_agent.TestDB(&db)

	//database_agent.Init()

	//Migrate(db)
	//defer db.Close()

	r := gin.Default()

	//set html
	r.LoadHTMLGlob("public/react_frontend/public/index*.html")
	//r.Static("/public/react_frontend/public", "static")
	r.Static("/static", "./public/react_frontend/public")

	//r.Use( static.Serve("/",static.LocalFile("./public/react_frontend/public",true)))

	//r.GET("/", func(c *gin.Context) {
	//	c.HTML(http.StatusOK, "index.html", nil)
	//})
	//////////////

	//setup API

	r.GET("/api/hero/*name", heroHandler)
	r.GET("/api/events/hero/*name", heroEventsHandler)

	v1 := r.Group("/api")
	users.UsersRegister(v1.Group("/users"))
	v1.Use(users.AuthMiddleware(false))
	articles.ArticlesAnonymousRegister(v1.Group("/articles"))
	articles.TagsAnonymousRegister(v1.Group("/tags"))

	v1.Use(users.AuthMiddleware(true))
	users.UserRegister(v1.Group("/user"))
	users.ProfileRegister(v1.Group("/profiles"))

	articles.ArticlesRegister(v1.Group("/articles"))

	testAuth := r.Group("/api/ping")

	testAuth.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	///////////////

	/*
		// test 1 to 1
		tx1 := db.Begin()
		userA := users.UserModel{
			Username: "AAAAAAAAAAAAAAAA",
			Email:    "aaaa@g.cn",
			Bio:      "hehddeda",
			Image:    nil,
		}
		tx1.Save(&userA)
		tx1.Commit()
		fmt.Println(userA)
	*/

	//db.Save(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//})
	//var userAA ArticleUserModel
	//db.Where(&ArticleUserModel{
	//    UserModelID:userA.ID,
	//}).First(&userAA)
	//fmt.Println(userAA)

	r.Run(":" + getEnvPort()) // listen and serve on 0.0.0.0:8080
}
func heroHandler(c *gin.Context) {

	var hero database_agent.HeroCharacter
	database_agent.FindHeroByName("Hedrik", &hero)

	c.JSON(200, hero)

}
func heroEventsHandler(c *gin.Context) {

	//try load hero
	var hero database_agent.HeroCharacter
	err := database_agent.FindHeroByName("Hedrik", &hero)

	//check if foud
	if err != nil {
		//not foud - create
		hero = database_agent.HeroCharacter{Name: "Hedrik",
			Level:  1,
			Xp:     0,
			Points: 3,
			Character: database_agent.Character{
				Strength:  (database_agent.Attribute)(1 + rand.Intn(4)),
				Intellect: (database_agent.Attribute)(1 + rand.Intn(4)),
				Charisma:  (database_agent.Attribute)(1 + rand.Intn(4))}}
		database_agent.AddHero(hero)
	}

	//add event
	NewEvent := CreateEvent()//database_agent.EventAdventure{"Battle", "win", XpBonus}

	//
	resultEvent := DetermineResult(hero, NewEvent)
	var resultString string

	if !resultEvent {

		NewEvent.Bonus = 0
		resultString = "lost"

	} else {
		resultString = "win"
	}

	NewEvent.Result = resultString

	//update hero xp
	database_agent.AddHeroXp(hero.Name, NewEvent.Bonus)

	database_agent.DBagent.AddEvent(NewEvent)

	Events := database_agent.DBagent.LoadEvents()
	c.JSON(200, Events)

}
func getEnvPort() string {
	ENV_PORT := os.Getenv("PORT")
	default_port := "8080"
	var port string
	if ENV_PORT != "" {
		port = ENV_PORT
	} else {
		port = default_port
	}
	return port
}

//gameplay
func DetermineResult(hero database_agent.HeroCharacter, event database_agent.EventAdventure) bool {
	//
	var attribute int
	switch event.Name {

	case ("Battle"):
		attribute = int(hero.Strength)
	case ("Puzzle"):
		attribute = int(hero.Intellect)
	case ("Intrugue"):
		attribute = int(hero.Charisma)
	default:
		attribute = 1

	}
	if attribute == 1 {
		fmt.Println(" No attribute detected ")
	}

	heroRoll := rand.Intn(attribute) * rand.Intn(attribute)
	result := heroRoll > 5

	return result

}
func CreateEvent() database_agent.EventAdventure {

	var NewEvent database_agent.EventAdventure
	EventTypes := []string{"Battle","Puzzle","Intrugue"}

	NewEvent.Name = EventTypes[ rand.Intn( len( EventTypes)  ) ]
	NewEvent.Bonus = rand.Intn(100) + 10

	return NewEvent

}