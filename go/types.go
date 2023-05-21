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
