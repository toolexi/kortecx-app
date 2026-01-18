import './App.css'
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Test from './Test.tsx';
import HomePage from './HomePage.tsx';

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Router>
      {/* <div>
        <a href="/">Home Page</a>
      </div> */}
    </>
  )
}

export default App
