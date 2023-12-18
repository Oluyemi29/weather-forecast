'use client'
import Image from 'next/image'
import { useState } from 'react'
import { FaCloudRain } from "react-icons/fa6";

export default function Home() {
  const [datum, setDatum]=useState('')
  const [formData,setFormData]=useState({
    location : ''
  })
  const handleChange = (e)=>{
    const{name,value}=e.target
    setFormData((previousData)=>{
      return{
        ...previousData,
        [name]:value
      }
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const {location}=formData
    // console.log(formData)
    const api_key = 'd87dba1411494061b8632600230712'
    const api_url = `https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${location}`
    const res = await fetch(api_url)
    const data = await res.json()
    setDatum(data)
    console.log(data)
  }
  return (
    <div className='md:flex md:flex-row w-full p-5 h-auto'>
      {/* <div>
        <form>
          <input onChange={handleChange} className='border-2 border-black rounded-sm' placeholder='Enter location' name='location' value={formData.location} />
          <button onClick={handleSubmit} className='bg-blue-500 text-[0.7rem] p-1 text-white'>Search</button>
        </form>
      </div> */}
      {/* <h1>Hello</h1> */}

      <div className='md:w-3/12 text-center p-5 text-white first rounded-tl-md rounded-bl-md'>
        <h1 className='md:text-xl md:font-bold mt-5'>WEATHER FORECAST</h1>
        <FaCloudRain className='md:w-36 md:h-36 w-24 h-24 m-auto mt-5'/>
        <h4 className='text-sm md:text-md mt-5'>Upcoming Weather Details</h4>
        <p  className='text-sm md:text-md'>The information is Right</p>

        <form className='mt-5'>
          <input type='text' value={formData.location} name='location' onChange={handleChange} placeholder='Enter Your Location' className='text-sm w-full h-8 rounded-md text-[#56b99f] pl-4'/>
          <button onClick={handleSubmit} className='text-white mt-10 bg-[#399179] h-10 border-2 border-white rounded-md w-full'>Search</button>
        </form>
        <p className='md:text-[0.7rem] text-[0.6rem] mt-5'>Current Conditions: Partly cloudy with a temperature</p>
        <p className='md:text-[0.7rem] text-[0.6rem]'>High/Low: Expect a high of [highest temperature]°C and a low of [lowest temperature]°C.</p>
        <p className='md:text-[0.7rem] text-[0.6rem]'>Wind: Winds blowing at [wind speed] km/h in the [direction].</p>
        <p className='md:text-[0.7rem] text-[0.6rem]'>Sunrise/Sunset: The sun will rise at [sunrise time] and set at [sunset time].</p>
      </div>
      <div className='md:w-9/12 bg-[#56b99f] text-center text-white rounded-tr-md rounded-br-md md:mt-0 mt-5 md:p-5'>
        <h1 className='font-bold mt-4'>WEATHER FORECAST</h1>
        <FaCloudRain className='w-24 h-24 m-auto mt-5'/>

            <div className='mt-5 grid md:grid-cols-4 py-5 gap-y-5 rounded-md allDet font-bold grid-cols-2 w-full items-center'>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Avg Hum</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.avghumidity}</h1>
              </div>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Avg temp C</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.avgtemp_c}</h1>
              </div>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Avg temp F</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.avgtemp_f}</h1>
              </div>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Icon </h1> <br/>
                {datum?.forecast?.forecastday[0]?.day?.condition?.icon?<img src={datum?.forecast?.forecastday[0]?.day?.condition?.icon} className='w-12 h-12 m-auto'/>  : ''} 
              </div>
            </div>
            <div className='mt-5 grid md:grid-cols-4 py-5 gap-y-5 rounded-md allDet font-bold grid-cols-2 w-full items-center'>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Max Temp C</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.maxtemp_c}</h1>
              </div>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Max Temp F</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.maxtemp_f}</h1>
              </div>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Max Wind KPH</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.maxwind_kph}</h1>
              </div>
              <div className='md:text-[0.9rem] text-[0.7rem] m-0'>
                <h1>Max Wind KPH</h1><br/>
                <h1>{datum?.forecast?.forecastday[0]?.day?.maxwind_mph}</h1>
              </div>
            </div>
        <div className='h-60 mt-5 overflow-y-scroll'>
          {datum?.forecast?.forecastday[0]?.hour?.map((eachHour)=>{
            return(
              <>
            <div className='mt-5 grid md:grid-cols-4 rounded-md allDet font-normal p-2 gap-4 grid-cols-2 w-full'>
              <div className='text-[0.9rem]'>
                <h1>Time <br/> {eachHour.time} UTC</h1>
              </div>
              <div className='text-[0.9rem]'>
                <h1>Pressure In <br/> {eachHour.pressure_in}</h1>
              </div>
              <div className='text-[0.9rem]'>
                <h1>Pressure MB<br/> {eachHour.pressure_mb}</h1>
              </div>
              <div className='text-[0.9rem]'>
                <h1>Chance of Rain <br/> {eachHour.chance_of_rain}</h1><br/>
              </div>
              <div className='text-[0.9rem]'>
                <h1>Chance of Snow <br/> {eachHour.chance_of_snow}</h1>
              </div>
              <div className='text-[0.9rem]'>
                <h1>Heat Index C<br/> {eachHour.heatindex_c}</h1>
              </div>
              <div className='text-[0.9rem]'>
                <h1>Heat Index F<br/> {eachHour.heatindex_f}</h1>
              </div>
              <div className='text-[0.9rem] '>
                <h1>Icon <br/> <img src={eachHour?.condition?.icon} className='w-10 h-10 m-auto'/></h1>
              </div>
            </div>
              </>
            )
          })}
        </div>
        
        

      </div>
    </div>
  )
}
