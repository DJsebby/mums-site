import { useState, useEffect } from 'react';

// Maps WMO weather codes to readable descriptions
const getWeatherDescription = (code) => {
    if (code === 0) return 'Clear sky';
    if (code >= 1 && code <= 3) return 'Mainly clear, partly cloudy';
    if (code >= 45 && code <= 48) return 'Fog';
    if (code >= 51 && code <= 55) return 'Drizzle';
    if (code >= 61 && code <= 67) return 'Rain';
    if (code >= 71 && code <= 77) return 'Snow';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Unknown';
};

export default function Weather() {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeather(latitude, longitude);
            },
            () => {
                // Fallback to London if permission denied or error
                fetchWeather(51.5074, -0.1278);
            }
        );
    }, []);

    const fetchWeather = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
            const data = await response.json();
            setWeather(data.current_weather);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch weather');
            setLoading(false);
        }
    };

    if (loading) return <div className="widget weather-widget">Loading weather...</div>;
    if (error && !weather) return <div className="widget weather-widget">Weather unavailable</div>;

    return (
        <div className="widget weather-widget">
            <h3>Current Weather</h3>
            <div className="weather-info">
                <span className="temperature">{weather?.temperature}°C</span>
                <span className="condition">{getWeatherDescription(weather?.weathercode)}</span>
            </div>
        </div>
    );
}
