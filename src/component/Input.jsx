import React, { useRef } from "react";
import { cityCode } from "../redux/slice";
import { useDispatch } from 'react-redux/es/exports'
import { useState } from "react";
const Input = () => {
const dispatch= useDispatch()
const [inp,setinp]=useState("")
const inpp=useRef()
  return (
    <>
      <form action=""
      onSubmit={(e)=>{
        e.preventDefault()

dispatch(cityCode(inp))
inpp.current.value=""      }}>
        <input type="text"
        placeholder="Enter a city ..."
        ref={inpp} onChange={(e)=>{
            setinp(e.target.value)
        }}/>
        <button>click</button>
      </form>
    </>
  );
};

export default Input;
