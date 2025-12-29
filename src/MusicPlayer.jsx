import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer({ playlist }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const audioRef = useRef(null);

    const currentSong = playlist[currentIndex];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = currentSong.url;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.log("Play failed:", e));
            }
        }
    }, [currentIndex, currentSong.url]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSkip = () => {
        const nextIndex = (currentIndex + 1) % playlist.length;
        setCurrentIndex(nextIndex);
        // When skipping, usually users expect it to play
        if (!isPlaying) setIsPlaying(true);
    };

    return (
        <div className="widget music-widget">
            <h3>{currentSong.title}</h3>
            <audio
                ref={audioRef}
                onEnded={handleSkip}
            />
            <div className="controls">
                <button onClick={togglePlay} className="control-button">
                    {isPlaying ? '❚❚ Pause' : '▶ Play'}
                </button>
                <button onClick={handleSkip} className="control-button skip-button">
                    ⏭ Skip
                </button>
            </div>
        </div>
    );
}
