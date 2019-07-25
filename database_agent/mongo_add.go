package database_agent

func (self *MongoAgent) AddOne(value interface{}, table string) {

	self.addObject(value, table)

}
func (dbagent *MongoAgent) UpdateOne(table string, filter interface{}, update interface{}) {

	dbagent.updateObject(table, filter, update)

}
