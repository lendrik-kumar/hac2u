package types

type SmartMeterReading struct {
	MeterID string     `json:"meter_id"`
	PhaseA  float64    `json:"phase_a"`
	PhaseB  float64    `json:"phase_b"`
	PhaseC  float64    `json:"phase_c"`
}