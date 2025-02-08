package Websocket

import (
	"github.com/gorilla/websocket"
	"net/http"
	"sync"
)

// update http to websocket and allow all types of queries from any port
var upgrader = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }}

// create a map of clients and a
// creation a map of clients and a mutex to lock the map
var clients = make(map[*websocket.Conn]bool)
var mutex = &sync.Mutex{}

// Update define the update struct whaich is the target phase to be brodcasted with meter id
type Update struct {
	MeterID    string  `json:"meter_id"`
	Phase      string  `json:"new_phase"`
	Alert      string  `json:"alert,omitempty"`
	Confidence float64 `json:"confidence,omitempty"`
	Imbalance  float64 `json:"imbalance,omitempty"`  // new field
}

// start the websocket server
func StartWebSocketServer() {
	http.HandleFunc("/ws", handleConnections)
	go http.ListenAndServe(":8080", nil)
}

// handle the connections
func handleConnections(w http.ResponseWriter, r *http.Request) {
	conn, _ := upgrader.Upgrade(w, r, nil)
	defer conn.Close()

	//prevent race conditions
	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	for { // Keep connection alive
		if _, _, err := conn.NextReader(); err != nil {
			break
		}
	}
}

// brodcast the update to all clients
func BroadcastUpdate(meterID string, phase string, imbalance float64) {
	msg := Update{
		MeterID:   meterID,
		Phase:     phase,
		Imbalance: imbalance,  // populate imbalance
	}
	for client := range clients {
		client.WriteJSON(msg)
	}
}