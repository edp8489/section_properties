package section_props

import "math"

type Shape struct {
	Shape        string
	D1           float64
	D2           float64
	NegativeArea bool
	CentroidX    float64
	CentroidY    float64
}

type ShapeList []Shape

type Centroid struct {
	Xloc float64
	Yloc float64
}

func RoundToPrecision(value float64, precision int) float64 {
	scale := math.Pow(10, float64(precision))
	return math.Round(value*scale) / scale
}

func CalcCentroid(segments ShapeList) Centroid {
	var sumArea float64 = 0.0
	var sumAiXi float64 = 0.0
	var sumAiYi float64 = 0.0

	for i := 0; i < len(segments); i++ {
		area_i := CalcArea(segments[i])
		sumArea += area_i
		sumAiXi += area_i * segments[i].CentroidX
		sumAiYi += area_i * segments[i].CentroidY
	}
	// centroid x coordinate
	centroidX := sumAiXi / sumArea
	// centroid y coordinate
	centroidY := sumAiYi / sumArea
	return Centroid{centroidX, centroidY}
}
