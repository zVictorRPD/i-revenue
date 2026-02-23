import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RoutesIndex } from './routes'
import { ThemeProvider } from './components/ui/theme-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <RoutesIndex />
    </ThemeProvider>
  </StrictMode>,
)
