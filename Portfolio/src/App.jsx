import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainPage from './pages/mainPages.jsx'

function App() {
  return (
    <BrowserRouter basename="/MyPortfolio">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<MainPage />} />
        {/* Ruta catch-all para redirigir cualquier otra ruta */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App