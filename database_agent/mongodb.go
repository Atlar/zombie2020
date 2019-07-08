package database_agent

import (
	"context"
	"fmt"
	"os"
	"time"

	//mongodb driver
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var DBagent MongoAgent

//init
func Init(agent *MongoAgent) error {

	//tutorial
	//https://github.com/mongodb/mongo-go-driver

	//create client
	ClientOptions := options.Client()
	//get Connection URI
	ConnectionURI := agent.GetConnectionUrl()
	ClientOptions.ApplyURI(ConnectionURI)
	client, err := mongo.NewClient(ClientOptions)

	if err != nil {

		fmt.Println(err)

	} else {

		fmt.Println("connection to database success")

	}

	//save created client incto wrap class
	agent.Client = *client

	fmt.Println("client saved")

	//connect
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	fmt.Println("context created")

	fmt.Println("connecting to database")
	err = agent.Connect(ctx)
	fmt.Println("connected to database")

	return err

}

func (agent *MongoAgent) InitDB() error {

	//tutorial
	//https://github.com/mongodb/mongo-go-driver

	//create client
	ClientOptions := options.Client()
	//get Connection URI
	ConnectionURI := agent.GetConnectionUrl()
	ClientOptions.ApplyURI(ConnectionURI)
	client, err := mongo.NewClient(ClientOptions)

	if err != nil {

		fmt.Println(err)

	} else {

		fmt.Println("connection to database success")

	}

	//save created client incto wrap class
	agent.Client = *client

	fmt.Println("client saved")

	//connect
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	fmt.Println("context created")

	fmt.Println("connecting to database")
	err = agent.Connect(ctx)
	fmt.Println("connected to database")

	return err

}

func TestDB(agent *MongoAgent) {

	//get collection
	collection := agent.Database("test").Collection("TestDoc")

	if collection == nil {
		fmt.Println("no such collection")
	}

	res, err := collection.InsertOne(context.Background(), bson.M{"hello": "world"})

	if err != nil {
		fmt.Println(err)
	}

	id := res.InsertedID

	fmt.Println("inserted id-", id)

}

type MongoAgent struct {
	//extended mongo client
	//wrapper
	ConnectionUrl string
	
	//options for queue
    queryOptions bson.D
		
	//Login         string
	//Password      string
	mongo.Client
}

func (dbagent *MongoAgent) GetConnectionUrl() string {

	//set password
	ENV_URL := os.Getenv("MONGODB_URI")
	default_url := "mongodb+srv://Atlar:00000094@monacomongocluster-luzdy.mongodb.net/test?retryWrites=true&w=majority"
	var url string
	if ENV_URL != "" {
		url = ENV_URL
	} else {
		url = default_url
	}
	return url

}

func (dbagent *MongoAgent) AddEvent(eventNew EventAdventure) {
	//get collection
	collection := dbagent.Database("test").Collection("TestEvent")

	if collection == nil {
		fmt.Println("no such collection")
	}

	res, err := collection.InsertOne(context.Background(), eventNew)

	if err != nil {
		fmt.Println(err)
	}

	id := res.InsertedID

	fmt.Println("inserted id-", id)

}

func (dbagent *MongoAgent) LoadEvents() []EventAdventure {
	//get collection
	collection := dbagent.Database("test").Collection("TestEvent")

	if collection == nil {
		fmt.Println("no such collection")
	}

	findOptions := options.Find()
	findOptions.SetLimit(10)
	findOptions.SetSort(bson.D{{"_id", -1}})

	cur, err := collection.Find(context.Background(), bson.D{{}}, findOptions)

	if err != nil {
		fmt.Println(err)
	}

	var Event1 EventAdventure
	var Result []EventAdventure
	for cur.Next(context.Background()) {

		cur.Decode(&Event1)
		Result = append(Result, Event1)
	}
	cur.Close(context.Background())
	fmt.Printf("Found multiple documents (array of pointers): %+v\n", Result)
	return Result

}
func (dbagent *MongoAgent) addObject(object interface{}, tableName string) {

	collection := dbagent.Database("test").Collection(tableName)
	if collection == nil {
		fmt.Println("no such collection")
	}

	res, err := collection.InsertOne(context.Background(), object)

	if err != nil {
		fmt.Println(err)
	}

	id := res.InsertedID

	fmt.Println("inserted id-", id, " into ", tableName)

}

//A private function because it implies the use of a mongodb specific type bson.D
func (dbagent *MongoAgent) findObject(tableName string, filter interface{}, objectFound interface{}) error {

	collection := dbagent.Database("test").Collection(tableName)

	//find that object
	res := collection.FindOne(context.Background(), filter)

	//check if error(not found) - return that error
	if res.Err() != nil {
		return res.Err()
	}

	//all is good - decode and return nil
	res.Decode(objectFound)
	return nil

}
func (dbagent *MongoAgent) updateObject(tableName string, filter interface{}, update interface{}) error {

	collection := dbagent.Database("test").Collection(tableName)
	res, err := collection.UpdateOne(context.Background(), filter, update)

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("Updated count -", res.ModifiedCount)
	}

	return err
}
func FindHeroByName(nameHero string, heroFound *HeroCharacter) error {

	//actually this wrap is to only hide the use of a mongoDB specific type bson.D
	err := DBagent.findObject("TestHero", bson.D{{"name", "Hedrik"}}, heroFound)

	//check if error(not found) - return that error
	if err != nil {
		return err
	}

	return nil

}
func AddHero(hero HeroCharacter) {
	DBagent.addObject(hero, "TestHero")
}
func AddHeroXp(heroName string, addedXP int) {

	//create command to increase Xp
	increaseXpCommand := bson.D{
		{"$inc",
			bson.D{{"xp", addedXP}}},
	}

	//create filter to find Hero
	filterHeroByName := bson.D{{"name", heroName}}

	DBagent.updateObject("TestHero", filterHeroByName, increaseXpCommand)

}

type EventAdventure struct {
	Name   string
	Result string
	Bonus  int
}

type HeroCharacter struct {
	Name   string
	Level  int
	Xp     int
	Points int
	Character
}

type Attribute int

type Character struct {
	Strength  Attribute
	Intellect Attribute
	Charisma  Attribute
}

//gorm interface
//find first by id
func (self *MongoAgent) First( foundObject interface{}, id uint ){

    self.findObject( "bookshelf" , bson.D{{"id", id}}, &foundObject) 


}

func (self *MongoAgent) AutoMigrate( object interface{} ){
     fmt.Println( object )
}

func (self *MongoAgent) Where( condition interface{}) *MongoAgent {

      self.queryOptions = bson.D{ condition.(bson.E) }
      return self

} 