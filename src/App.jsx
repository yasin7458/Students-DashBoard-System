import './App.css'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Navbar from './components/Navbar'
import WelcomeHeader from './components/WelcomeHeader'

function App() {
  return (
    <>
      <div>
        <Dashboard />
      </div>

      <div style={{ marginLeft: "250px" }}>
        <Navbar />
      </div>

      <div>
        <WelcomeHeader />
      </div>

      <div>
        <Home />
      </div>
    </>
  )
}

export default App
