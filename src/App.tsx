import './App.css'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './pages/Test.tsx';
import HomePage from './pages/HomePage.tsx';
import { Dashboard } from './pages/dashboard.tsx';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
