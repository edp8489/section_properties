'use client'
//import styles from './page.module.css'
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputsCard from '../Components/InputsCard'
import SummaryCard from '../Components/SummaryCard';
import Grid from '@mui/material/Grid';
import { ShapeArraySVG } from '../Components/SVGGenerator';

// analytics TODO

// theme
// defined using let instead of const in case you want to set
// other elements later based on primary/secondary colors
//let lightTheme = light
//let darkTheme = dark

// uncomment next line to define additional customizations
// theme = createTheme(theme, {**});

const fieldsSchema = require('../form_schema.json')
const uiSchema = require('../form_ui_schema.json')

const tableStyle = {
  border: "1px solid black",
  borderCollapse: "collapse",
  padding: "2px 5px"
}

function DebugTable(objectArray) {
  
  const fieldNames = Object.keys(fieldsSchema.properties)
  const headerCols = fieldNames.concat("Area","Icg,x", "Icg,y")
  const tableHeader = <tr>{headerCols.map((name, hIndex) => (
    <td key={"header" + hIndex} style={tableStyle} >
      <b>{name}</b>
    </td>
  ))}</tr>

  let tableRows = objectArray === null ? <tr key="666"><td colSpan={headerCols.length}>No items in array!</td></tr> :
    objectArray.map((item,rowIndex) => (
      <tr key={"row"+rowIndex}>{fieldNames.map((name, colIndex) => (
        <td key={"col"+colIndex} style={tableStyle}>{`${item[name]}`}</td>))}</tr>))

  return (
    <table style={tableStyle}>
      <thead>{tableHeader}</thead>
      <tbody>{tableRows}</tbody>
    </table>
  )

}


export default function Home(props) {
  const [shapeList, setShapeList] = React.useState(null)

  function addShape(newShape) {
    console.log("Item added to array")
    console.log(newShape)
    shapeList == null? setShapeList([newShape]) : setShapeList(shapeList.concat(newShape))
  }

  const placeholderPlot = <svg xmlns="http://www.w3.org/2000/svg" width="640" height="480">
    <rect x="220" y="65" width="200" height="75" fill="gray" />
    <rect x="295" y="140" width="50" height="200" fill="gray" />
    <rect x="220" y="340" width="200" height="75" fill="gray" />
  </svg>

  return (
    <main>
      <SummaryCard />
      <InputsCard sx={{ textAlign: "center" }} fieldsSchema={fieldsSchema} uiSchema={uiSchema} submitFunction={addShape} />
      <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px", textAlign: "center" }, ...props.sx }}>
        <Typography variant="overline">Results</Typography><br />
        <Box sx={{ textAlign: "center" }}>
          <Grid>
            <Grid item xs={12} md={6}>
            {DebugTable(shapeList)}
            </Grid>
            <Grid item xs={12} md={6}>
              <table style={tableStyle} >
                <thead><tr><th>Centroid X</th><th>Centroid Y</th><th>Area</th><th>Icg,x</th><th>Icg,y</th><th>Jcg,z</th></tr></thead>
              <tbody><tr><td colSpan="6">Not implemented yet</td></tr></tbody>
              </table>
            </Grid> 
          </Grid><br />
            {shapeList != null?ShapeArraySVG(shapeList):null}
          
        </Box>
      </Paper>
    </main>
  )
}
