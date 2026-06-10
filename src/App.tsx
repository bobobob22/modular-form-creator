import { BrowserRouter } from 'react-router-dom'
import { CompletedEditBufferProvider } from '@/shared/context/CompletedEditBufferProvider'
import { ToastProvider } from '@/shared/context/ToastProvider'
import { ResourcesRoutes } from '@/features/resources/routes/ResourcesRoutes'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CompletedEditBufferProvider>
          <ResourcesRoutes />
        </CompletedEditBufferProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
