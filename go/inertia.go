package section_props

import "math"

/*
inertia.go contains function definitions for calculating second moment of area ("bending moment of inertia")
values for basic and composite shapes
*/

// RectangleIxx calculates the bending moment of inertia about the horizontal axis for a rectangle
func RectangleIxx(d1, d2 float64) float64 {
	/*
		d1 is defined as the shape width (parallel to horizontal axis)
		d2 is defined as the shape height (parallel to vertical axis)
	*/
	var Ixx float64 = (d1 * math.Pow(d2, 3)) / 12
	return Ixx
}

// RectangleIxx calculates the bending moment of inertia about the vertical axis for a rectangle
func RectangleIyy(d1, d2 float64) float64 {
	/*
		d1 is defined as the shape width (parallel to horizontal axis)
		d2 is defined as the shape height (parallel to vertical axis)
	*/
	var Iyy float64 = (d2 * math.Pow(d1, 3)) / 12

	return Iyy
}

// CircleI calculates the bending moment of inertia about an arbitrary axis for a circle
// Ixx = Iyy = Icentroid
func CircleI(d1 float64) float64 {
	var Icentroid float64 = (math.Pi / 4) * math.Pow(d1/2, 4)
	return Icentroid
}

// ParallelAxis calculates the bending moment of inertia about a parallel axis offset
// by a distance dr from the shape centroid
func ParallelAxis() float64 {

	return 0.0
}

// PerpendicularAxis calculates the polar moment of area (torsional stiffness) for a shape
// about an axis through the centroid and perpendicular to Ixx and Iyy
func PerpendicularAxis(Ix, Iy float64) float64 {
	var Jz float64 = Ix + Iy
	return Jz
}
