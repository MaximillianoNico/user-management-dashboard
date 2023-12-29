package Controllers

import (
	"fmt"
	"net/http"

	repository "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/repository"
	"github.com/gin-gonic/gin"
)

func (ctr *AppControllers) GetUsers(c *gin.Context) {

	err, users := ctr.client.GetUsers()
	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    users,
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

	c.JSON(http.StatusOK, gin.H{"message": "Create successful", "user": user})
}

func (ctr *AppControllers) UpdateUser(c *gin.Context) {
	var user repository.User

	// Bind the JSON body to the User struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("users: ", user.Username)
	if user.Username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username is required"})
		return
	}

	err := ctr.client.UpdateUserInfo(user)
	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Update successful"})
}

func (ctr *AppControllers) DeleteUser(c *gin.Context) {
	var user repository.User

	// Bind the JSON body to the User struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if user.Username == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username is required"})
		return
	}

	err := ctr.client.DeleteUser(user.Username)
	if err != nil {
		fmt.Println("Error: ", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Delete successful"})
}

func (ctr *AppControllers) UsersController() {
	ctr.users.rGroup.GET("/", ctr.GetUsers)
	ctr.users.rGroup.POST("/new", ctr.CreateNewUser)
	ctr.users.rGroup.PATCH("/update", ctr.UpdateUser)
	ctr.users.rGroup.DELETE("/delete", ctr.DeleteUser)
}
