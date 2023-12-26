package Controllers

import (
  "net/http"
  "github.com/gin-gonic/gin"
)

func (ctr *AppControllers) GetUsers (c *gin.Context) {
  c.JSON(http.StatusOK, gin.H{ 
    "message": "success",
  })
}

func (ctr *AppControllers) UsersController() {
  ctr.users.rGroup.GET("/", ctr.GetUsers)
}
