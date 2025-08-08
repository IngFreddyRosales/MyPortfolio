import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import MainPage from './pages/mainPages.jsx'



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<MainPage />} />

      </Routes>
    </Router>
  )
}

export default App
