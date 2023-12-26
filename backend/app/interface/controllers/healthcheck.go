package Controllers

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func (ctr *AppControllers) GetHealthCheck (c *gin.Context) {
  c.JSON(http.StatusOK, gin.H{ 
    "message": "pong",
  })
}

func (ctr *AppControllers) HealthCheck() {
  ctr.healthcheck.rGroup.GET("/", ctr.GetHealthCheck)
}
