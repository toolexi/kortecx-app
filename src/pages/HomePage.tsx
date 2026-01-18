import { useState } from 'react'
import kortecx_logo from '../assets/kortecx_icon.png'
import '../App.css'
import axios from 'axios'
import * as motion from "motion/react-client"
import { Navbar } from '../components/Navbar'


function HomePage() {
  // const [count, setCount] = useState(0)

  const [resp, setResp] = useState<any>(null);

  const fetchKortecx = () => {
    axios.get('/kortecx')
      .then(response => {
        setResp(response); // Access the actual data here
        // Handle success, update state, etc.
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle errors (network issues, 404, etc.)
      });
  };

  // Call the function to initiate the request
  // fetchKortecx();


  return (
    <>
      <div>
        <a href="https://kortecx.com" target="_blank">
            <motion.img
              src={kortecx_logo}
              className="logo react"
              alt="Kortecx logo"
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          {/* <img src={kortecx_logo} className="logo react" alt="Kortecx logo" /> */}
        </a>
      </div>
      <h1>Kortecx : Executable Intelligence Platform</h1>

      <div>
        <button onClick={fetchKortecx}>
          Test Backend Request
        </button>
        <p>{resp?.data?.message}</p>
      </div>

      <div>
        <a href="/dashboard">Dashboard</a>
      </div>
    </>
  )
}

export default HomePage
