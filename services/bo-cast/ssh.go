package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/charmbracelet/wish"
	"github.com/charmbracelet/wish/logging"
	"github.com/gliderlabs/ssh"
	gossh "golang.org/x/crypto/ssh"
)

const (
	host = "localhost"
	port = 23234
)

func InitSsh() {
	s, err := wish.NewServer(
		wish.WithAddress(fmt.Sprintf("%s:%d", host, port)),
		wish.WithHostKeyPath(".ssh/bo-cast-key"),
		// wish.WithAuthorizedKeys(".ssh/authorized_keys"),
		wish.WithPublicKeyAuth(func(ctx ssh.Context, key ssh.PublicKey) bool {
			return true
		}),
		wish.WithMiddleware(
			func(h ssh.Handler) ssh.Handler {
				return func(s ssh.Session) {
					fabrizio, _, _, _, _ := ssh.ParseAuthorizedKey(
						[]byte("ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC3MlExvtihcTP7HL0ds0Sd9f4aAGvuokwqeiqXc427LseL0gErdflpBoGG0cjt5af2Jan4ZskpVyrJ/cmhjtHfhN6KGrXngWHQTYzvu5s4nzo7Xi6271dK0BKD5jDNTxiffWtadPdsi8N22tTXMANrmohRMdt+7CM9Fmjj+IoY2Uh/Jo0Vpg0XeMbUqLxICLBpyOMsq3gxjvMIu1Q+8/5d8VJWRvpH9tgzvgyPOlNWB2yat11yB5if+B07+q+n5n7gFTL5zpSkmv9Jhf7rxuKt5LEU844kEftv9xPzJ1IWCPvYaDSFbvvMCDO35JOH+W6LPWigx66ZcF3uYdHXk6dR fabrizio"),
					)
					dinu, _, _, _, _ := ssh.ParseAuthorizedKey(
						[]byte("ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPtY6Y1JNS6Q4XClWGYwH+bIEjgICd5bUqM3b1Du0rd3"),
					)
					switch {
					case ssh.KeysEqual(s.PublicKey(), fabrizio):
						wish.Println(s, "Hey, Fabrizio!")
					case ssh.KeysEqual(s.PublicKey(), dinu):
						wish.Println(s, "Hey, Dinu!")
					default:
						wish.Println(s, "Hey, I don't know who you are!")
						authorizedKey := gossh.MarshalAuthorizedKey(s.PublicKey())
						io.WriteString(s, fmt.Sprintf("public key used by %s:\n", s.User()))
						s.Write(authorizedKey)
						h(s)
						return
					}

					status := "Current line numbers:\n"
					for roomName, room := range Rooms {
						status += fmt.Sprintf("%s: %d / %d\n", roomName, room.Current, len(room.Lines))
					}
					wish.Println(s, status)
					pty, _, active := s.Pty()

					if !active {
						wish.Println(s, "Terminal inactive")
					}

					wish.Println(s, pty.Term)
					c := make(chan ssh.Signal, 1)
					s.Signals(c)

					go func() {
						io.Copy(os.Stdin, s) // stdin
					}()
					// io.Copy(s, os.Stdout) // stdout
					data := make([]byte, 600)
					n, err := s.Read(data)
					wish.Println(s, "Storage:", string(data[:n]), err)
					h(s)
				}
			},
			logging.Middleware(),
		),
	)
	if err != nil {
		log.Fatalln(err)
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)
	log.Printf("Starting SSH server on %s:%d", host, port)
	go func() {
		if err = s.ListenAndServe(); err != nil {
			log.Fatalln(err)
		}
	}()

	<-done
	log.Println("Stopping SSH server")
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer func() { cancel() }()
	if err := s.Shutdown(ctx); err != nil {
		log.Fatalln(err)
	}
}
