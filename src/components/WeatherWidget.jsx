import { useState, useEffect, useRef } from 'react'
import { FaWind, FaTint, FaThermometerHalf } from 'react-icons/fa'

// Security: API key via env variable — never hardcode secrets
const API_KEY    = import.meta.env.VITE_WEATHER_API_KEY
const LAT        = 49.2728
const LON        = 1.1964
const CITY_NAME  = 'Val-de-Reuil'
const CACHE_KEY  = 'weather_cache'
const CACHE_TTL  = 10 * 60 * 1000 // 10 minutes

export default function WeatherWidget() {
  const [weather, setWeather]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(false)
  const abortRef                = useRef(null)

  useEffect(() => {
    if (!API_KEY) {
      setLoading(false)
      return
    }

    const fetchWeather = async () => {
      // Return cached data if still fresh
      try {
        const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || 'null')
        if (cached && Date.now() - cached.ts < CACHE_TTL) {
          setWeather(cached.data)
          setLoading(false)
          return
        }
      } catch { /* ignore */ }

      // Abort any in-flight request
      abortRef.current?.abort()
      abortRef.current = new AbortController()

      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=fr`,
          { signal: abortRef.current.signal }
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data }))
        setWeather(data)
        setError(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(true)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
    const interval = setInterval(fetchWeather, CACHE_TTL)
    return () => {
      clearInterval(interval)
      abortRef.current?.abort()
    }
  }, [])

  // Skeleton while loading
  if (loading) {
    return (
      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/70 rounded-full shadow-md border border-gray-100">
        <div className="w-8 h-8 rounded-full shimmer" />
        <div className="w-24 h-4 rounded shimmer" />
        <div className="w-16 h-4 rounded shimmer" />
      </div>
    )
  }

  // Silent on error — don't break the page
  if (error || !weather) return null

  const temp        = Math.round(weather.main.temp)
  const feelsLike   = Math.round(weather.main.feels_like)
  const description = weather.weather[0].description
  const icon        = weather.weather[0].icon
  const humidity    = weather.main.humidity
  const wind        = Math.round(weather.wind.speed * 3.6) // m/s → km/h

  return (
    <div
      className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-gray-100/80 text-sm"
      title={`Ressenti : ${feelsLike}°C`}
    >
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
        width={32}
        height={32}
        className="w-8 h-8"
        loading="eager"
      />
      <span className="font-semibold text-gray-900">{CITY_NAME}</span>
      <span className="text-gray-300">|</span>
      <span className="font-bold text-primary-700">
        <FaThermometerHalf className="inline mr-0.5 text-primary-500" />
        {temp}°C
      </span>
      <span className="capitalize text-gray-500 hidden sm:inline">{description}</span>
      <span className="text-gray-300 hidden md:inline">|</span>
      <span className="hidden md:inline-flex items-center gap-1 text-gray-500">
        <FaTint className="text-primary-400 text-xs" /> {humidity}%
      </span>
      <span className="hidden md:inline-flex items-center gap-1 text-gray-500">
        <FaWind className="text-primary-400 text-xs" /> {wind} km/h
      </span>
    </div>
  )
}
