import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [status, setStatus] = useState('Bereit zum Start')
  const [distance, setDistance] = useState<number | null>(null)
  const navigate = useNavigate()

  function startGame() {
    setGameStarted(true)
    setStatus('Spieler wird gesucht…')
    setTimeout(() => {
      setStatus('Spieler gefunden!')
      setDistance(37)
    }, 2000)
  }

  function openMap() {
    navigate('/map')
  }

  return (
    <div className="app-container">
      {!gameStarted && (
        <button className="start-button" onClick={startGame}>
          Start
        </button>
      )}

      {gameStarted && <div className="status-text">{status}</div>}

      {gameStarted && (
        <div className="compass-container">
          <div className="compass">↑</div>
          {distance && <div className="distance">{distance} m</div>}
        </div>
      )}

      <button className="map-button" onClick={openMap}>
        Map
      </button>
    </div>
  )
}
