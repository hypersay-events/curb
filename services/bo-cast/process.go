package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"
)

type Caption struct {
	TimestampStart int64  `json:"timestampStart"`
	TimestampEnd   int64  `json:"timestampEnd"`
	RoomName       string `json:"roomName"`
	Lang           string `json:"lang"`
	Text           string `json:"text"`
	Transient      bool   `json:"transient"`
	SkipTranslate  bool   `json:"skipTranslate"`
}

func ProcessLines(name string, room *Room) {
	for text := range room.LinesChan {
		caption, err := json.Marshal(Caption{
			TimestampStart: time.Now().Unix() * 1000,
			TimestampEnd:   time.Now().Unix()*1000 + int64(len(text)*100),
			RoomName:       name,
			Lang:           room.Language,
			Text:           text,
			Transient:      true,
			SkipTranslate:  false,
		})

		if err != nil {
			log.Printf("Error encoding caption: %s\n", err.Error())
			continue
		}

		resp, err := http.Post("https://hse-curbcut.fly.dev/caption", "application/json", bytes.NewBuffer(caption))
		// resp, err := http.Post("http://localhost:4554/caption", "application/json", bytes.NewBuffer(caption))

		if err != nil {
			log.Printf("Error posting caption: %s\n", err.Error())
			continue
		}

		log.Printf("%s: %s", resp.Status, strings.ReplaceAll(text, "\n", "\t"))
	}
}
