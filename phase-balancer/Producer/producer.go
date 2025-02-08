package producer

import (
	"phase-balancer/types"
	"context"
	"encoding/json"
	"math/rand"
	"time"

	"github.com/segmentio/kafka-go"
)

func StartMockProducer() {
	// Produce mock data

	// Get a kaka write along with configuration to send data to a topic on a local host
	writer := kafka.NewWriter(kafka.WriterConfig{
		Brokers:  []string{"localhost:9092"},
		Topic:    "smart-meter-readings",
		Balancer: &kafka.LeastBytes{},
	})
	// Generate Random meter readings
	for {
		reading := types.SmartMeterReading{
			MeterID: "meter-" + randString(5),
			PhaseA:  rand.Float64() * 100,
			PhaseB:  rand.Float64() * 100,
			PhaseC:  rand.Float64() * 100,
		}
		// send the readings in a json format
		jsonData, _ := json.Marshal(reading)
		writer.WriteMessages(context.Background(), kafka.Message{Value: jsonData})
		time.Sleep(10 * time.Millisecond)
	}
}

// Define a random string generator
func randString(n int) string {
	var letter = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
	b := make([]rune, n)
	for i := range b {
		b[i] = letter[rand.Intn(len(letter))]
	}
	return string(b)
}