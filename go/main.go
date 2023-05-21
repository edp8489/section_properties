package main

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

func CalcArea(shape Shape) float64 {
	// Implement your logic here
	var area float64
	switch shape.Shape {
	case "rectangle":
		area = areaRectangle(shape.D1, shape.D2)
	case "circle":
		area = areaCircle(shape.D1)
	}

	if shape.NegativeArea {
		area = -1 * area
	}
	return area
}

func areaRectangle(d1, d2 float64) float64 {
	area := d1 * d2
	return area
}

func areaCircle(d1 float64) float64 {
	area := math.Pi * math.Pow(d1, 2) / 4
	return area
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

func main() {

}
