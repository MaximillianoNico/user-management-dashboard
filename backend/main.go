package main

import (
	webserver "github.com/MaximillianoNico/user-management-dashboard/backend/app/infrastructure/webserver"
)

func main() {
	App := webserver.NewApp("v1.0")

	App.RunApp()
}
