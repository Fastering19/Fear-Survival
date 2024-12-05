package main

import (

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
	"github.com/gofiber/fiber/v3/middleware/pprof"
	"github.com/gofiber/template/mustache/v2"

	"log"
	"time"
)

func main() {
	engine := mustache.New("./views", ".mustache")
    app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Get("/", func(c fiber.Ctx) error {
        return c.SendString("test yo") // => ✋ register
    }).Name("api");

	app.Get("/*", static.New("./static", static.Config{
		Compress:      true,
		ByteRange:     true,
		Browse:        true,
		CacheDuration: 10 * time.Second,
		MaxAge:        3600,
	}))

	app.Use(pprof.New())

	log.Fatal(app.Listen(":8080"))
}
