import  { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import weatherImage from './weather-news_648198.png'; 
import axios from 'axios';


function App() {

    const apiKey="dfd992f34a078a6e68b872426cfd3255";
    const [inputCity, setInputCity]=useState("")
    const [data, setData]=useState({})
    const [error, setError]=useState("");
    
    const getWeatherDetails=(cityName)=>{
        if(!cityName) return
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        axios.get(apiURL).then((res) =>{
            console.log("response",res.data)
            setData(res.data)
        }).catch((err)=>{
            console.log("err",err);
            setError("City not found or there was an error fetching the data.");
        })
    }

    const handleChangeInput=(e)=>{
        console.log("value", e.target.value);
        setInputCity(e.target.value)
    }

    const handleSearch=()=>{
        getWeatherDetails(inputCity)
    }

    const formatTime = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert to milliseconds
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes} ${ampm}`;
      };

      

    

  return (
    <div className="col-md-12">
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-7QVGTPVZP3"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-7QVGTPVZP3');
</script>
      <h1 className="heading">Get Weather</h1>
      <div className='d-grid gap-2 col-15 mt-4' >
          <input type='text' className='form-control ' value={inputCity} onChange={handleChangeInput} placeholder='Enter city name' />
          <button className='btn btn-primary ' type="button" onClick={handleSearch}> Search </button>
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}
      {Object.keys(data).length > 0 && !error &&

            <div className='col-md-18 text-center mt-4 '>
                <div className='shadow rounded weatherResultBox'>
                <img className='weatherIcon'
                 src={weatherImage} alt="Weather"  />

                <h5 className='WeatherCity'>
                   {data?.name} 
                </h5>
                <h6 className='weatherTemp'>
                {((data?.main?.temp) - 273.15).toFixed(2)}°C
                </h6>
                <div className='weatherUp'>
                <p>{data.weather[0].main}</p>
                </div>
                <div className='weatherDetails'>

                      <span>Sunrise:  {formatTime(data?.sys?.sunrise)} </span> 
                    <span>Sunset: {formatTime(data?.sys?.sunset)} </span>
                    <span>Feels like: {((data?.main?.feels_like) - 273.15).toFixed(2)}°C</span>
                    <span>Humidity:  {data?.main?.humidity}% </span>
                    <span>Pressure: {data?.main?.pressure} hPa</span>
                    <span>Wind:  {data?.wind?.speed} m/s </span>
                    
                    
                </div>

          </div>
              </div>
}

    </div>
  );
}

export default App;
