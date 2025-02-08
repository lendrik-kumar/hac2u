package Consumer

import (
	"context"
	"encoding/json"
	"math"
	"time"

	"phase-balancer/Websocket"
	"phase-balancer/types"


	"github.com/go-redis/redis/v8"
	"github.com/segmentio/kafka-go"
)

// var redis client & define a thereshold
var (
	redisClient     = redis.NewClient(&redis.Options{Addr: "localhost:6379"})
	threshold       = 0.2
)

// Consume mock data
func StartConsumer() {
	// Start a Consumer
	// get consumer needs a kafka reader

	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{"localhost:9092"},
		Topic:   "smart-meter-readings",
		GroupID: "phase-balancer",
	})
	// get json form producer and then call process to process the data
	for {
		msg, _ := r.ReadMessage(context.Background())
		var reading types.SmartMeterReading
		json.Unmarshal(msg.Value, &reading)
		process(reading)
	}
}

// Calculate if its imbalanced and if yess caluculates target phase and brodcasts to websocked frontend
func process(reading types.SmartMeterReading) {

	// Calculate the imbalance
	max := math.Max(math.Max(reading.PhaseA, reading.PhaseB), reading.PhaseC)
	min := math.Min(math.Min(reading.PhaseA, reading.PhaseB), reading.PhaseC)
	imbalance := (max - min) / max

	// teargetphase and brodcast to frontend and store in redis
	if imbalance > threshold {
		targetPhase := calculateTargetPhase(reading)
		storeInRedis(reading.MeterID, targetPhase)
		Websocket.BroadcastUpdate(reading.MeterID, targetPhase)
	}
}

// calculate the target phase
func calculateTargetPhase(reading types.SmartMeterReading) string {
	if reading.PhaseA > reading.PhaseB && reading.PhaseA > reading.PhaseC {
		return "B"
	}
	return "A"
}

// store the target phase in redis so that recent data is safe
func storeInRedis(meterID string, phase string) {
	redisClient.ZAdd(context.Background(), "meter:"+meterID, &redis.Z{
		Score:  float64(time.Now().Unix()),
		Member: phase,
	})
}
