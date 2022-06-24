package main

import (
	"fmt"
	"time"
)

func main() {
	LoadRooms()
	en := Rooms["terminator.en"]
	// en := Room{Language: "en", Current: 0, Lines: []string{"Ana", "Are", "Mere", "Roșii"}, LinesChan: make(chan string)}
	go en.StartBroadcasting()

	for val := range en.LinesChan {
		fmt.Printf("Val: %s\n", val)
	}
	time.Sleep(100 * time.Second)
}
