import { useState } from 'react'
import './index.css'
import 'leaflet/dist/leaflet.css'
import Map from './Map'
import { Button } from '@/components/ui/button'

export default function App() {
  const [gameStarted, setGameStarted] = useState(false)

  function startGame() {
    console.log('Game started!')
    setGameStarted(true)
  }

  function resetGame() {
    console.log('Game reset!')
    setGameStarted(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#121212] text-white">
      <header className="w-full py-6">
        <h1 className="text-center text-4xl font-bold text-violet-700">CatchMe</h1>
      </header>

      <main className="flex-grow w-full max-w-5xl px-4 flex flex-col items-center gap-6">
        {/* Map Container */}
        <div className="w-full h-[60vh] rounded-lg overflow-hidden shadow-lg border border-violet-700">
          <Map />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={startGame}>
            Start Game
          </Button>
          <Button variant="secondary" onClick={resetGame}>
            Reset Game
          </Button>
        </div>
      </main>
    </div>
  )
}
