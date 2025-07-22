import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ConfigProvider } from "@/context/ConfigContext"
import { ErrorProvider } from "@/context/ErrorContext"
import './index.css'
import App from './App.tsx'
import Basic from './pages/Basics.tsx'
import Communication from './pages/Communication.tsx'
import FSI from './pages/FSI.tsx'
import Reviews from './pages/Review.tsx'
import ErrorValidator from './hooks/ErrorValidator.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Basic /> },
      { path: "/Communcation", element: <Communication /> },
      { path: "/FSI", element: <FSI /> },
      { path: "/Review", element: <Reviews /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
    <ConfigProvider>
      <ErrorProvider>
        <RouterProvider router={router} />
        <ErrorValidator />
      </ErrorProvider>
    </ConfigProvider>,
)
