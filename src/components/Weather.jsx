import React, { useEffect, useState } from "react";
import axios from "axios"
import "./weather.css"

const Weather=()=>{
    const [city, setCity] = useState("")
    const [show, setShow] = useState()
    const [history, setHistory] = useState([])
    const [error, setError] = useState("")
 
        useEffect(()=>{
            fetchApi()
        },[])
 
        const fetchApi=async(e)=>{
            await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=75637829715e761a68172edb96bf1c24`)
            .then((response)=> {
                setError(()=>{setError("")})
                setShow(response.data)
                let name = show.name
                let temp = show.main.temp
                setHistory(()=>{              // history.push also works i.e. without using setHistory
                    return [...history, {name, temp}]
                })
                if(history.length>=3){
                    history.splice(0,1)
                } 
            })
            .catch(function (error) {
                if(city){
                    setError("Enter valid city name")
                }
            });
        }
     

    return <>
        <div className="weather-main">
            <h1>Weather App</h1>
            <div>
                <form onSubmit={(e)=>{e.preventDefault(); fetchApi(e)}}>
                    <div>
                        <input placeholder="Enter City Name" value={city} onChange={(e)=>{setCity(e.target.value)}} />
                    </div>
                    <div>
                        <button>Show Weather</button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>  

                {/* DETAILS SHOWING  */}
                
                <div className="details-div">
                    {!error && show ? 
                    <div>
                        <div>Weather details of city: <span className="span">{show.name}</span></div>
                        <div>Current Temperature: <span className="span">{parseFloat(show.main.temp - 273).toFixed(2)}</span></div>
                        <div>Temperature Range: <span className="span">{parseFloat(show.main.temp_min - 273).toFixed(2)} to {parseFloat(show.main.temp_max - 273).toFixed(2)}</span></div>
                        <div>Humidity: <span className="span">{show.main.humidity}</span></div>
                        <div>Ground Level: <span className="span">{show.main.grnd_level}</span></div>
                        <div>Sea Level: <span className="span">{show.main.sea_level}</span></div>
                    </div> 
                    : ""       
                }
                </div>  
                <hr></hr>  

                {/* HOSTORY SHOWING   */}

                <div className="history-div">
                    <h3 >History</h3> 
                    <div className="history-elements">
                        {history.map((item, key)=>{
                            return <> 
                                    <div>{key+1}: {item.name} temperature : <span className="span">{parseFloat(item.temp-273).toFixed(2)}</span> </div>
                            </>
                        })}      
                    </div>
                </div>
            </div>
        </div>    
    </>
}
export default Weather