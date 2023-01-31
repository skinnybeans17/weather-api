import { useState } from 'react'
import './Weather.css'
import RadioButton from './RadioButton'
import WeatherDisplay from './weatherDisplay'

function Weather() {
    const [zip, setZip] = useState('94609')
    const [unit, setUnit] = useState('')
    const [data, setData] = useState(null)

    async function fetchWeather() {
        const apikey = '9567ee3ade4553c9fa313ae954cc6677'
        const path = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}&units=${unit}`
        const res = await fetch(path)
        const json = await res.json()
        //console.log(json)
        const cod = json.cod
        const message = json.message
        if (cod !== 200) {
            setData({ cod, message })
            return
        }
        const temp = json.main.temp
        const feelsLike = json.main.feels_like
        const description = json.weather[0].description
        const humid = json.main.humidity
        const pressure = json.main.pressure
        setData({
          cod,
          message,
          temp,
          feelsLike,
          description,
          humid,
          pressure
        })
    }

    return (
        <div className="Weather">
            {data && <WeatherDisplay {... data}/>}
            <form onSubmit={e => {
                e.preventDefault()
                fetchWeather()
            }}>
                <div>
                    <input
                    placeholder="Enter Zip Code"
                    value={zip}
                    onChange={e => setZip(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </div>

                <select
                    value={unit}
                    onChange={e => setUnit(e.target.value)}>
                    <option value="metric ">Celcius</option>
                    <option value="imperial ">Fahrenheit</option>
                    <option value="standard ">Kelvin</option>
                </select>

                <RadioButton
                  label="metric "
                  name="unit"
                  checked={unit === 'metric '}
                  onChange={() => setUnit('metric ')}
                />

                <RadioButton
                  label="imperial "
                  name="unit"
                  checked={unit === 'imperial '}
                  onChange={() => setUnit('imperial ')}
                />

                <RadioButton
                  label="standard "
                  name="unit"
                  checked={unit === 'standard '}
                  onChange={() => setUnit('standard ')}
                />

            </form>
        </div>
    )
}

export default Weather