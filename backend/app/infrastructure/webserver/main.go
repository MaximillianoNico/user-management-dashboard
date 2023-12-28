package webserver

import (
	repository "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/repository"
	Interface "github.com/MaximillianoNico/user-management-dashboard/backend/app/interface"
	"github.com/gin-gonic/gin"
)

type App struct {
	version string
}

func NewApp(
	version string,
) *App {
	return &App{
		version: version,
	}
}

func (svc *App) RunApp() {
	app := gin.Default()
	app.Use(gin.Logger())
	app.Use(gin.Recovery())

	app.ForwardedByClientIP = true
	app.SetTrustedProxies([]string{"127.0.0.1"})

	client := repository.NewDatabase()

	Router := Interface.NewInterface(app, client)

	newApp := Router.Init()

	newApp.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
