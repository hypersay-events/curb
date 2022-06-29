package main

import (
	"os"
)

func GetEnvWithFallback(key string, fallback string) string {
	val, ok := os.LookupEnv(key)
	if ok {
		return val
	} else {
		return fallback
	}
}
