package database_agent

import (
	"context"
	"fmt"

	//mongodb driver

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
	//findOptions.SetLimit(10)
	//findOptions.SetSort(bson.D{{"_id", -1}})

	cur, err := collection.Find(context.Background(), filter, findOptions)

	if err != nil {
		fmt.Println(err)
	}

	errDecode := cur.All(context.Background(), objectFoundSlice)
	fmt.Println("err decode - ", errDecode, "-value-", objectFoundSlice, " -cursor- ", cur)
	//slice of unknown
	//https://stackoverflow.com/questions/24777603/create-slice-of-unknown-type
	//slice := reflect.ValueOf(objectFoundSlice).Elem()
	//slice.Set(reflect.MakeSlice(slice.Type(), 0, 100))

	/*elementType := slice.Type().Elem()
	value := reflect.New(elementType)

	for cur.Next(context.Background()) {

		errDecode := cur.Decode(value.Interface())
		fmt.Println("err decode - ", errDecode, "-value-", value, " -cursor- ", cur)
		slice.Set(reflect.Append(slice, value.Elem()))
	}*/
	cur.Close(context.Background())
	fmt.Printf("Found multiple documents (array of pointers): %+v\n", objectFoundSlice)

}
