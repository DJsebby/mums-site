import { useState } from 'react'
import confetti from 'canvas-confetti'
import Weather from './Weather'
import MusicPlayer from './MusicPlayer'

const compliments = [
  "You're an incredibly thoughtful person.",
  "You have a great sense of humor!",
  "Your smile lights up the room.",
  "You are more capable than you know.",
  "You bring out the best in other people.",
  "You're a great listener.",
  "You have a unique perspective that is worth sharing.",
  "You are strong and resilient.",
  "You make a difference in the world.",
  "You deserve all the happiness coming your way."
];

// Curated playlist - User can replace these URLs with their own
const playlist = [
  { title: "Obsesión", url: "/music/Aventura - Obsesión (ft. Judy Santos).mp3" },
  { title: "Hoja En BLANCO", url: "/music/Hoja En BLANCO  - Monchy & Alexandra (Vídeo Oficial).mp3" },
  { title: "Te Quiero Igual Que Ayer", url: "/music/Monchy & Alexandra  Te Quiero Igual Que Ayer (Audio).mp3" },
  { title: "Dos Locos", url: "/music/Monchy & Alexandra - Dos Locos - Video Lyric.mp3" },
  { title: "La Culebritica (Noche de Oro)", url: "/music/Grupo 5 - La Culebritica (Noche de Oro).mp3" },
  { title: "El Embrujo", url: "/music/Grupo 5 - El Embrujo.mp3" },
];

function App() {
  const [compliment, setCompliment] = useState("Click the button to receive a compliment!");

  const handleGetCompliment = () => {
    // Pick random compliment
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    setCompliment(randomCompliment);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <h1>For my mum</h1>
        <p className="compliment-text">{compliment}</p>
        <button onClick={handleGetCompliment} className="action-button">
          Get Compliment
        </button>
        <div className="widgets-container">
          <Weather />
          <MusicPlayer playlist={playlist} />
        </div>
      </div>
    </div>
  )
}

export default App
