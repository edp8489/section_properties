package main

import (
	"math"
	"testing"
)

var exampleIbeam = ShapeList{
	{
		Shape:        "rectangle",
		D1:           5.0,
		D2:           1.0,
		NegativeArea: false,
		CentroidX:    2.5,
		CentroidY:    3.0,
	},
	{
		Shape:        "rectangle",
		D1:           1.0,
		D2:           5.0,
		NegativeArea: false,
		CentroidX:    2.5,
		CentroidY:    0.0,
	},
	{
		Shape:        "rectangle",
		D1:           5.0,
		D2:           1.0,
		NegativeArea: false,
		CentroidX:    2.5,
		CentroidY:    -3.0,
	},
}

var hollowCircle = ShapeList{
	{Shape: "circle",
		D1:           4.0,
		D2:           0.0,
		NegativeArea: false,
		CentroidX:    0.0,
		CentroidY:    0.0},
	{Shape: "circle",
		D1:           2.0,
		D2:           0.0,
		NegativeArea: true,
		CentroidX:    0.0,
		CentroidY:    0.0},
}

func TestArea(t *testing.T) {
	// Test cases
	tests := []struct {
		name     string
		shape    Shape
		expected float64
	}{
		{
			name: "Test Case 1",
			shape: Shape{
				Shape:        "rectangle",
				D1:           5.0,
				D2:           3.0,
				NegativeArea: false,
				CentroidX:    2.5,
				CentroidY:    1.5,
			},
			expected: 15.0,
		},
		{
			name: "Unit Circle",
			shape: Shape{
				Shape:        "circle",
				D1:           2.0,
				D2:           0.0,
				NegativeArea: false,
				CentroidX:    0.0,
				CentroidY:    0.0,
			},
			expected: math.Pi,
		},
		// Add more test cases here if needed
		{
			name: "Unit Circle, Negative Area",
			shape: Shape{
				Shape:        "circle",
				D1:           2.0,
				D2:           0.0,
				NegativeArea: true,
				CentroidX:    0.0,
				CentroidY:    0.0,
			},
			expected: -math.Pi,
		},
	}
	// Run tests
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			// Call the function
			result := CalcArea(test.shape)

			roundedResult := RoundToPrecision(result, 6)
			roundedExpected := RoundToPrecision(test.expected, 6)

			// Check if the result matches the expected value
			if roundedResult != roundedExpected {
				t.Errorf("Test '%s' failed: expected %v, got %v", test.name, test.expected, result)
			}
		})
	}
}

func TestCentroid(t *testing.T) {
	// test cases
	tests := []struct {
		name      string
		shapeList ShapeList
		expected  Centroid
	}{
		{
			name:      "Centroid: I-beam",
			shapeList: exampleIbeam,
			expected:  Centroid{2.5, 0.0},
		},
		{
			name:      "Centroid: hollow circle",
			shapeList: hollowCircle,
			expected:  Centroid{0.0, 0.0},
		},
	}

	// run tests
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			// Call the function
			result := CalcCentroid(test.shapeList)

			roundedResult := Centroid{RoundToPrecision(result.Xloc, 6), RoundToPrecision(result.Yloc, 6)}
			roundedExpected := Centroid{RoundToPrecision(test.expected.Xloc, 6), RoundToPrecision(test.expected.Yloc, 6)}

			// Check if the result matches the expected value
			if roundedResult != roundedExpected {
				t.Errorf("Test '%s' failed: expected %.6f, got %.6f", test.name, test.expected, result)
			}
		})
	}

}
