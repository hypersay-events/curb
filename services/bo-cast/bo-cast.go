package main

import (
	"sync"
)

func main() {
	LoadRooms()
	var wg sync.WaitGroup

	for roomName, room := range Rooms {
		wg.Add(1)
		go room.StartBroadcasting()
		go ProcessLines(roomName, room)
	}

	InitSsh()
	wg.Wait()
}
