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
	err := agent.Connect(ctx)
	fmt.Println("connected to database")

	return err

}

func TestDB(agent *MongoAgent) {

	//get collection
	collection := agent.Database("Test").Collection("TestDoc")

	res, err := collection.InsertOne(context.Background(), bson.M{"hello": "world"})

	if err != nil {
		fmt.Println(err)
	}

	id := res.InsertedID

	fmt.Println("inserted id-" + id)

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
	url := os.Getenv("MONGODB_URI")
	return url

}
