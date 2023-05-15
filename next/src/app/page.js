'use client'
//import styles from './page.module.css'
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import InputsCard from '../Components/InputsCard'
import SummaryCard from '../Components/SummaryCard';

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

function debugTable(objectArray) {
  const fieldNames = Object.keys(fieldsSchema.properties)
  let tableHeader = <tr>{fieldNames.map((name) => (<td><b>{name}</b></td>))}</tr>

  let tableRows = objectArray.length == 0 ? <tr><td>"No items in array!"</td></tr> :
    objectArray.map((item) => (<tr>{fieldNames.map((name) => (<td>{item[name]}</td>))}</tr>))

  return (<table><thead>{tableHeader}</thead><tbody>{tableRows}</tbody></table>)

}


export default function Home(props) {
  const [shapeList, setShapeList] = React.useState([])

  function addShape(newShape) {
    setShapeList(shapeList.concat(newShape))
  }

  return (
    <main>
      <SummaryCard />
      <InputsCard sx={{ textAlign: "center" }} fieldsSchema={fieldsSchema} uiSchema={uiSchema} submitFunction={addShape} />
      <Paper elevation={3} sx={{ ...{ marginTop: "10px", marginBottom: "10px", padding: "10px", textAlign: "center" }, ...props.sx }}>
        <Typography variant="overline">Results</Typography><br />
        <Box>
          {debugTable(shapeList)}
        </Box>
      </Paper>
    </main>
  )
}
