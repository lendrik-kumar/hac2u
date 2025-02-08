package main

import (
	"phase-balancer/Consumer"
	producer "phase-balancer/Producer"
	"phase-balancer/Websocket"
)

func main() {
	// Produce the data
	go producer.StartMockProducer()
	// Consume or process kafka produced mock data
	go Consumer.StartConsumer()
	// Start the server
	Websocket.StartWebSocketServer()
	// Prevent from exiting main func
	select {}
}
