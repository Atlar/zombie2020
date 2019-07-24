package database_agent

import (
	"context"
	"fmt"

	"reflect"

	//mongodb driver
	"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (self *MongoAgent) FindMany(objects string, filter interface{}, objectFoundSlice interface{}) {

	//get collection
	collection := self.Database("test").Collection(objects)

	if collection == nil {
		fmt.Println("no such collection")
	}

	findOptions := options.Find()
	findOptions.SetLimit(10)
	findOptions.SetSort(bson.D{{"_id", -1}})

	cur, err := collection.Find(context.Background(), filter, findOptions)

	if err != nil {
		fmt.Println(err)
	}

	//slice of unknown
	//https://stackoverflow.com/questions/24777603/create-slice-of-unknown-type
	slice := reflect.ValueOf(objectFoundSlice).Elem()
	slice.Set(reflect.MakeSlice(slice.Type(), 0, 100))

	elementType := slice.Type().Elem()
	value := reflect.New(elementType)

	for cur.Next(context.Background()) {

		cur.Decode(value.Interface())
		slice.Set(reflect.Append(slice, value.Elem()))
	}
	cur.Close(context.Background())
	fmt.Printf("Found multiple documents (array of pointers): %+v\n", objectFoundSlice)

}
