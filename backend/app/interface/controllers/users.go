package Controllers

import (
	"fmt"
	"net/http"

	repository "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/repository"
	"github.com/gin-gonic/gin"
)

func (ctr *AppControllers) GetUsers(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "success",
	})
}

func (ctr *AppControllers) CreateNewUser(c *gin.Context) {
	var user repository.User

	// Bind the JSON body to the User struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := ctr.client.CreateUser(user)
	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Login successful", "user": user})
}

func (ctr *AppControllers) UsersController() {
	ctr.users.rGroup.GET("/", ctr.GetUsers)
	ctr.users.rGroup.POST("/new", ctr.CreateNewUser)
}
