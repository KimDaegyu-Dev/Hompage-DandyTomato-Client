// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App'
// import { worker } from './mocks/browser'
import { ThemeProvider } from './components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient()
// if (import.meta.env.MODE === 'development') {
// worker.start()
// }

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </BrowserRouter>
)
