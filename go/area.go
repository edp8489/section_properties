package section_props

import "math"

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
