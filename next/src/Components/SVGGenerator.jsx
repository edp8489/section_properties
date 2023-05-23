import React from 'react'


export function CenterRectangle(shape, keyID, canvasWidth, canvasHeight, pxScaleFactor){
    // (0,0) point for SVG canvas and shapes is top left corner
    const width = pxScaleFactor * shape.d1
    const height = pxScaleFactor * shape.d2
    const centX = pxScaleFactor * shape.centroid_X
    const centY = pxScaleFactor * shape.centroid_Y

    const cornerX = (centX - 0.5*width)
    const cornerY = -(centY + 0.5*height)

    const fillColor = shape.negativeArea? "white" : "gray"

    return(
        <rect key={"shape" + keyID} x={cornerX} y={cornerY} width={width} height={height} fill={fillColor} />
    )
}

export function ShapeArraySVG(shapeArray){
    // SVG canvas is agnostic to actual dimensions of shapes
    const svgWidth = 800
    const svgHeight = 600
    // define a pixel scale factor based on maximum height/width of shapes
    const cxPlusD1 = shapeArray.map((shape) => {
        return (shape.centroid_X + (0.5*shape.d1))
    })
    const cxMinusD1 = shapeArray.map((shape) => {
        return (shape.centroid_X - (0.5*shape.d1))
    })
    const cyPlusD2 = shapeArray.map((shape) => {
        let d2 = shape.shape=="Circle"? shape.d1 : shape.d2
        return (shape.centroid_Y + (0.5*d2))
    })
    const cyMinusD2 = shapeArray.map((shape) => {
        let d2 = shape.shape=="Circle"? shape.d1 : shape.d2
        return (shape.centroid_Y - (0.5*d2))
    })
    
    let xMin = Math.min.apply(null,cxMinusD1)
    console.log("xmin: " + xMin)
    let xMax = Math.max.apply(null,cxPlusD1)
    console.log("xmax: " + xMax)
    let yMin = Math.min.apply(null,cyMinusD2)
    console.log("yMin: " + yMin)
    let yMax = Math.max.apply(null,cyPlusD2)
    console.log("ymax: " + yMax)

    let scaleX = Math.floor((0.9*svgWidth)/(xMax - xMin))
    console.log("scaleX " + scaleX)
    let scaleY = Math.floor((0.9*svgHeight)/(yMax - yMin))
    console.log("scaleY " + scaleY)
    let scaleFactor = Math.min(scaleX, scaleY)

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width={svgWidth} height={svgHeight} >
            {shapeArray.map((shape, ind) => shape.shape ==="Rectangle"? CenterRectangle(shape, ind, svgWidth, svgHeight,scaleFactor) : null)}
        </svg>
    )
}