package section_props

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
