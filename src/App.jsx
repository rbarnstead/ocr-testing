import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scanner from './scanner'
import TestScanner from './test-scanner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        Hello
        <TestScanner></TestScanner>
      </div>
    </>
  )
}

export default App
