import React from 'react'


export function CenterRectangle(shape, keyID, canvasWidth, canvasHeight, pxScaleFactor){
    // (0,0) point for SVG canvas and shapes is top left corner
    let width = pxScaleFactor * shape.d1
    let height = pxScaleFactor * shape.d2
    let centX = pxScaleFactor * shape.centroid_X
    let centY = pxScaleFactor * shape.centroid_Y

    let cornerX = (0.5*canvasWidth) + (centX - 0.5*width)
    let cornerY = (0.5*canvasHeight) - (centY + 0.5*height)

    const fillColor = shape.negativeArea? "white" : "gray"

    return(
        <rect key={"shape" + keyID} x={cornerX} y={cornerY} width={width} height={height} stroke="black" fill={fillColor} />
    )
}

export function CenterCircle(shape, keyID, canvasWidth, canvasHeight, pxScaleFactor){
    // SVG circle is defined with center point and radius
    let radius = pxScaleFactor * 0.5*shape.d1
    let centX = (0.5*canvasWidth) + (pxScaleFactor * shape.centroid_X)
    let centY = (0.5*canvasHeight) - (pxScaleFactor * shape.centroid_Y)

    const fillColor = shape.negativeArea? "white" : "gray"

    return(
        <circle key={"shape" + keyID} cx={centX} cy={centY} r={radius} stroke="black" fill={fillColor} />
    )
}

export function DrawShape(shape, keyID, canvasWidth, canvasHeight, pxScaleFactor){
    if (shape.shape ==="Rectangle"){
        return CenterRectangle(shape, keyID, canvasWidth, canvasHeight, pxScaleFactor)
    }
    if (shape.shape==="Circle"){
        return CenterCircle(shape, keyID, canvasWidth, canvasHeight, pxScaleFactor)
    }
}

export function ShapeArraySVG(shapeArray){
    // SVG canvas is agnostic to actual dimensions of shapes
    const svgWidth = 800
    const svgHeight = 600
    // define a pixel scale factor based on maximum height/width of shapes
    let cxPlusD1 = shapeArray.map((shape) => {
        return ((0.5*svgWidth) + shape.centroid_X + (0.5*shape.d1))
    })
    let cxMinusD1 = shapeArray.map((shape) => {
        return ((0.5*svgWidth) + shape.centroid_X - (0.5*shape.d1))
    })
    let cyPlusD2 = shapeArray.map((shape) => {
        let d2 = shape.shape=="Circle"? shape.d1 : shape.d2
        return ((0.5*svgHeight) - (shape.centroid_Y + (0.5*d2)))
    })
    let cyMinusD2 = shapeArray.map((shape) => {
        let d2 = shape.shape=="Circle"? shape.d1 : shape.d2
        return ((0.5*svgHeight) + (shape.centroid_Y - (0.5*d2)))
    })
    
    let xMin = Math.min.apply(null,cxMinusD1)
    //console.log("xmin: " + xMin)
    let xMax = Math.max.apply(null,cxPlusD1)
    //console.log("xmax: " + xMax)
    let yMin = Math.min.apply(null,cyMinusD2)
    //console.log("yMin: " + yMin)
    let yMax = Math.max.apply(null,cyPlusD2)
    //console.log("ymax: " + yMax)

    let scaleX = Math.floor((0.9*svgWidth)/(xMax - xMin))
    console.log("scaleX " + scaleX)
    let scaleY = Math.floor((0.9*svgHeight)/(yMax - yMin))
    console.log("scaleY " + scaleY)
    let scaleFactor = Math.min(96, scaleX, scaleY)

    const svgCanvasStyle = {
        width:"100%",
        height:"auto",
        maxWidth: `${svgWidth}px`,
        border: '1px solid black'
    }

    return(
        <svg xmlns="http://www.w3.org/2000/svg" style={svgCanvasStyle} viewBox={`0 0 ${svgWidth} ${svgHeight}`} >
            <line x1="0" x2={svgWidth} y1={0.5*svgHeight} y2={0.5*svgHeight} id="x-axis" stroke="black" />
            <text x={0.98*svgWidth} y={0.48*svgHeight} >X</text>
            <line x1={0.5*svgWidth} x2={0.5*svgWidth} y1="0" y2={svgHeight} id="y-axis" stroke="black" />
            <text x={0.51*svgWidth} y="1em">Y</text>
            {shapeArray.map((shape, ind) => DrawShape(shape, ind, svgWidth, svgHeight,scaleFactor))}
        </svg>
    )
}