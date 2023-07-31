import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Header = () => {
    const [date,setDate]=useState("")
    useEffect(()=>{
      
setDate(  new Date().toLocaleDateString())
    },[])
  return (
    <div id='header'>
        <h1>Weather App</h1>
        <h3>Date:{date}</h3>
    </div>
  )
}

export default Header