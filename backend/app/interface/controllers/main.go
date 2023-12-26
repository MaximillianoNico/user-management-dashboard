package Controllers

import (
  "github.com/gin-gonic/gin"
)

type RouteGroup struct {
  rGroup *gin.RouterGroup
}

type AppControllers struct {
  router *gin.Engine
  healthcheck *RouteGroup
  users *RouteGroup
}

func NewController(
  router *gin.Engine,
) *AppControllers {
  return &AppControllers {
    router: router,
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