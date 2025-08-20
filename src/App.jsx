import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scanner from './scanner'
import TestScanner from './test-scanner'
import TestScanner2 from './test-scanner-2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        Hello
        <TestScanner2></TestScanner2>
      </div>
    </>
  )
}

export default App
