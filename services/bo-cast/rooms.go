package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"path"
	"strings"
	"time"

	"github.com/asticode/go-astisub"
)

type Room struct {
	Language  string
	Current   int
	Lines     []string
	LinesChan chan string
}

var Rooms = make(map[string]Room)

func LoadRooms() {
	files, err := ioutil.ReadDir("./files")
	if err != nil {
		log.Fatal(err)
	}

	for _, f := range files {
		name := f.Name()
		if string(name[len(name)-4:]) != ".srt" {
			log.Printf("Ignoring non srt file %s\n", name)
			continue
		}
		if string(name[len(name)-7:len(name)-6]) != "." {
			log.Printf("Subtiles must be named like <film>.<lang>.srt. %s Doesn't seem to follow convention.\n", name)
			continue
		}
		roomName := name[0 : len(name)-4]
		lang := roomName[len(roomName)-2:]

		srt, err := astisub.OpenFile(path.Join("./files", name))

		if err != nil {
			log.Printf("Could not open %s, %v\n", name, err)
			continue
		}

		var lines []string

		for _, item := range srt.Items {
			var lineItems []string
			for _, line := range item.Lines {
				for _, lineItem := range line.Items {
					lineItems = append(lineItems, lineItem.Text)
				}
			}
			lines = append(lines, strings.Join(lineItems, "\n"))
		}

		room := Room{Language: lang, Current: 0, Lines: lines, LinesChan: make(chan string, 1)}
		Rooms[roomName] = room
		log.Printf("Loaded room %s (language: %s)\n", roomName, lang)
	}
}

func (r *Room) GetNextLine() string {
	if len(r.Lines) < 1 {
		log.Println("Tried to start broadcasting before room is initialised")
		return ""
	}

	line := r.Lines[r.Current]
	r.Current = (r.Current + 1) % len(r.Lines)
	return fmt.Sprintf("%d/%d. %s", r.Current, len(r.Lines), line)
}

func (r *Room) StartBroadcasting() {
	for i := 0; i < 1000; i++ {
		line := r.GetNextLine()
		multiplier := time.Duration(len(r.GetNextLine()) / 25) // 1 second per 25 characters
		timer := time.NewTimer(multiplier * time.Second)
		<-timer.C
		r.LinesChan <- line
	}
}
