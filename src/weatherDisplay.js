function WeatherDisplay(props) {
    const { temp, feelsLike, description, humid, pressure, cod, message } = props

    if (cod !== 200) {
        return (
            <small>{message}</small>
        )
    }

    return (
        <div className="WeatherDisplay">
            <h1>{temp}</h1>
            <small>Feels Like: {feelsLike}</small>
            <p>{description}</p>
            <p>Humidity of {humid}</p>
            <p>Pressure of {pressure}</p>
        </div>
    )
}

export default WeatherDisplay