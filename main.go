package main

import (

	"github.com/gofiber/fiber/v3"
	"github.com/gofiber/fiber/v3/middleware/static"
	"github.com/gofiber/fiber/v3/middleware/pprof"
 "github.com/gofiber/fiber/v3/middleware/logger"
	"github.com/gofiber/template/mustache/v2"

	"log"
	"time"
)

func main() {
	engine := mustache.New("./views", ".mustache")
    app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Use(logger.New(logger.Config{
    	Format: "[${ip}]:${port} <<${latency}>> ${status} - ${method} ${path}\n",
	}))
	app.Use(pprof.New())

	app.Get("/", func(c fiber.Ctx) error {
        return c.Render("home", fiber.Map{
			"Title": "Hello, World!",
		})
    }).Name("home");

	app.Get("/*", static.New("./static", static.Config{
		Compress:      false,
		ByteRange:     true,
		Browse:        true,
		CacheDuration: 10 * time.Second,
		MaxAge:        3600,
	}))

 

	log.Fatal(app.Listen(":8080"))
}
