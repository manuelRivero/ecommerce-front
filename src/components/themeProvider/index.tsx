"use client"
import React from 'react'
import { CssBaseline, Experimental_CssVarsProvider } from '@mui/material'
import { theme } from '@/theme'

const ThemeProvider = ( {children}: { children: React.ReactNode }) => (
  <Experimental_CssVarsProvider theme={theme} modeStorageKey="color_mode">
  <CssBaseline enableColorScheme />
  {children}
</Experimental_CssVarsProvider>
)

export default ThemeProvider