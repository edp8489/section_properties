package section_props

import (
	"math"
	"testing"
)

func TestCircleI(t *testing.T) {
	tests := []struct {
		name     string
		shape    Shape
		expected float64
	}{
		{
			name:     "Unit circle Ixx",
			shape:    hollowCircle[1],
			expected: math.Pi / 4,
		},
	}
	// run tests
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			// Call the function
			result := CircleI(test.shape.D1)

			roundedResult := RoundToPrecision(result, 6)
			roundedExpected := RoundToPrecision(test.expected, 6)

			// Check if the result matches the expected value
			if roundedResult != roundedExpected {
				t.Errorf("Test '%s' failed: expected %.6f, got %.6f", test.name, test.expected, result)
			}
		})
	}
}

func TestRectIxx(t *testing.T) {

}

func TestRectIyy(t *testing.T) {

}
