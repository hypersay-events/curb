package main

import (
	"sync"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	LoadRooms()
	var wg sync.WaitGroup

	for roomName, room := range Rooms {
		wg.Add(1)
		go room.StartBroadcasting()
		go ProcessLines(roomName, room)
	}

	if GetEnvWithFallback("CURBCUT_SSH_SERVER_ENABLED", "false") == "true" {
		InitSsh()
	}
	wg.Wait()
}
