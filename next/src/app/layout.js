'use client'

//import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react';
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Paper } from "@mui/material";
import { NavBar, Footer } from '../Components/NavBar'
import { light, dark } from "../Components/styles.js";

const inter = Inter({ subsets: ['latin'] })

let lightTheme = light
let darkTheme = dark

// export const metadata = {
//   title: 'Section Properties',
//   description: '...',
// }

export default function RootLayout({ children }) {
  const [darkMode, toggleDark] = React.useState(false);
  let theme = darkMode ? darkTheme : lightTheme;

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box className="App" sx={{ width: "75%", marginLeft: "12.5%", marginRight: "12.5%" }}>
            <NavBar themeToggle={() => toggleDark(!darkMode)} />
            {children}
            <Footer />
          </Box>
        </ThemeProvider>
      </body>
    </html>
  )
}
