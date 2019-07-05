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

func (dbagent *MongoAgent) AddEvent( eventNew EventAdventure ){
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

func (dbagent *MongoAgent) LoadEvents( ) []EventAdventure {
	//get collection
	collection := dbagent.Database("test").Collection("TestEvent")

	if collection == nil {
		fmt.Println("no such collection")
	}

	findOptions := options.Find()
findOptions.SetLimit(10)

	cur, err := collection.Find(context.Background(),bson.D{{}},findOptions)
    
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
    fmt.Printf( "Found multiple documents (array of pointers): %+v\n", Result )
    return Result
    
}

type EventAdventure struct{
	
	Name string
	Result string
	Bonus int
	
}