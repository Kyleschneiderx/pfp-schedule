import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InputCalendar from './components/core/forms/input-calendar'

function App () {
  const [ count, setCount ] = useState(0)

  return (
    <>
      <div>
        <InputCalendar onChange={(e) => {console.log(e)}}/>
      </div>
    </>
  )
}

export default App
