package main

import (
	"net/http"

	"gopkg.in/gin-gonic/gin.v1"
)

func HandleEntry(context *gin.Context) {

	var EntryInfo EntrTestProject
	context.BindJSON(&EntryInfo)
	newEntry := EntrTestProject{Title: EntryInfo.Title, Text: EntryInfo.Text, Id: EntryInfo.Id}
	context.JSON(http.StatusOK, newEntry)

}


type EntrTestProject struct {
	Title string `json:"title"`
	Text  string `json:"text"`

	Id ID `json:"id"`
}

