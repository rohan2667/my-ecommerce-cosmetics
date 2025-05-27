import { useState } from 'react'
import './App.css'
import Homepage from './assets/homepage.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     
      <div>
        <Homepage />
        <h1></h1>
      </div>
    </>
  )
}

export default App
