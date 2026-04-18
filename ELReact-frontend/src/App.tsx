import './App.css'
import Button from './components/button/Buttun'

function App() {
  return (
    <>
      <Button text='Click me' onClick={() => alert('Button clicked!')} />
    </>
  )
}

export default App
