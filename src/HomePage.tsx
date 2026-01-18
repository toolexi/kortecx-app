import { useState } from 'react'
import kortecx_logo from './assets/kortecx_icon.png'
import './App.css'
import axios from 'axios'

function HomePage() {
  const [count, setCount] = useState(0)

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
          <img src={kortecx_logo} className="logo react" alt="Kortecx logo" />
        </a>
      </div>
      <h1>Kortecx : Executable Intelligence Platform</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div>
        <button onClick={fetchKortecx}>
          Test Backend Request
        </button>
        <p>{resp?.data?.message}</p>
      </div>

      <div>
        <a href="/test">Test Page</a>
      </div>
    </>
  )
}

export default HomePage
