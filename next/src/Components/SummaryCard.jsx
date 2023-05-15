import React from "react";
import { Box, Paper } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function SummaryCard(props) {

  return (
    <Paper elevation={3} sx={{ marginTop: "20px", padding: "10px" }}>
      <Typography component="div">
        <Box sx={{ typography: "h3", textAlign: "center" }}>Section Properties</Box>
        <br />
        <Box sx={{ typography: "p", textAlign: "center" }}>
          This tool allows you to create a complex cross-section using basic shapes and calculates second moment of area ("area moment of inertia") for all axes.<br /> <br />
          <i>Note: All calculations are performed in your local browser session. No data is sent to an external server.</i>
            
        </Box>
      </Typography>
    </Paper>
  )
}