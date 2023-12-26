package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
  webserver "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/webserver"
)

func main() {
  App := webserver.NewApp()

  App.RunApp()
}