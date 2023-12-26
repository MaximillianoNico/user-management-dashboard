package Interface

import (
  "github.com/gin-gonic/gin"
  Controllers "github.com/MaximillianoNico/user-management-dashboard/backend/app/interface/controllers"
)

type AppInterface struct {
  app *gin.Engine
}

func NewInterface(
  app *gin.Engine,
) *AppInterface {
  return &AppInterface {
    app: app,
  }
}

func (r *AppInterface) Init() *gin.Engine {
  Ctr := Controllers.NewController(r.app)

  Ctr.InitController();
  
  return r.app
}