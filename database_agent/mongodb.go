package database_agent

import (
	"context"
	"fmt"
	"os"
	"time"

	//mongodb driver
	"github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/mongo"
	"github.com/mongodb/mongo-go-driver/options"
)

//init
func Init(agent *mongoAgent) error {

	//tutorial
	//https://github.com/mongodb/mongo-go-driver

	//create client
	ClientOptions := options.Client()
	//get Connection URI
	ConnectionURI := mongoAgent.getConnectionUrl()
	ClientOptions.ApplyURI(ConnectionURI)
	client, err := mongo.NewClient(ClientOptions)

	if err != nil {

		fmt.Println(err)

	} else {

		fmt.Println("connection to database success")

	}

	//save created client incto wrap class
	agent.Client = client

	fmt.Println("client saved")

	//connect
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	fmt.Println("context created")

	fmt.Println("connecting to database")
	err := agent.Connect(ctx)
	fmt.Println("connected to database")

	return err

}

func TestDB(agent *mongoAgent) {

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

func (dbagent *mongoAgent) GetConnectionUrl() string {

	//set password
	url := os.Getenv("MONGODB_URI")
	return url

}
