package Interface

import (
	repository "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/repository"
	Controllers "github.com/MaximillianoNico/user-management-dashboard/backend/app/interface/controllers"
	"github.com/gin-gonic/gin"
)

type AppInterface struct {
	app    *gin.Engine
	client *repository.DBClient
	// client *sql.DB
}

func NewInterface(
	app *gin.Engine,
	client *repository.DBClient,
) *AppInterface {
	return &AppInterface{
		app:    app,
		client: client,
	}
}

func (r *AppInterface) Init() *gin.Engine {
	Ctr := Controllers.NewController(r.app, r.client)

	Ctr.InitController()

	return r.app
}
