package database_agent

func (self *MongoAgent) AddOne(value interface{}, table string) {

	self.addObject(value, table)

}
