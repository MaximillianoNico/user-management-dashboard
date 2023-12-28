package Controllers

import (
	repository "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/repository"
	"github.com/gin-gonic/gin"
)

type RouteGroup struct {
	rGroup *gin.RouterGroup
}

type AppControllers struct {
	router      *gin.Engine
	client      *repository.DBClient
	healthcheck *RouteGroup
	users       *RouteGroup
}

func NewController(
	router *gin.Engine,
	client *repository.DBClient,
) *AppControllers {
	return &AppControllers{
		router: router,
		client: client,
		healthcheck: &RouteGroup{
			rGroup: router.Group("/healthcheck"),
		},
		users: &RouteGroup{
			rGroup: router.Group("/users"),
		},
	}
}

func (c *AppControllers) InitController() {
	c.HealthCheck()
	c.UsersController()
}
