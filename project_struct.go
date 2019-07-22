package main

type Project struct {
	Id           ID				  `binding:"omitempty"`
	Name         string           `json:"Name"`
	Participants Participation	  `binding:"omitempty"`
	Entries      Participation    `binding:"omitempty"`
	HistoryStamps                 `binding:"omitempty"`
}
type AddProject struct {

   Name           string
   Participants   []ID
   Entries        []ID
   
}