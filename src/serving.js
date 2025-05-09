import { useContext, useEffect, useState } from "react";
import React from 'react'
import { userContext } from "./main";

const Serving = () => {
    const {quantity,setQuantity,unit} =useContext(userContext);
    

    const[Increase,setIncrease]=useState(0);
    const propartional=Increase*10

    const Handle_Increase =()=>{
        if(Increase<100 ){
            setIncrease(Increase+10)
        }
    }
    const Handle_Decrease =()=>{
        if(Increase>0 ){
            setIncrease(Increase-10)
        }
    }
   useEffect(()=>{
        if(unit==='gram'){
            setQuantity(quantity*10);
            <h1>{quantity}</h1>
        }
        else if(unit==='cups'){
            setQuantity(quantity*2)
        }
        else if(unit==='kg'){
            setQuantity(quantity*1)
        }
        else if(unit==='ml'){
            setQuantity(quantity*100)
        }
    },[Increase])
  return (
    <>
    <div style={{width:'400px',height:'180px', textAlign:'center',border:'2px black solid'}}>
    
    <h1>Number Of servings:{Increase}</h1>
    <button type="button" onClick={Handle_Increase}>+10</button>
    <button type="button" onClick={Handle_Decrease}>-10</button>
    
    <h2>Quantity:{propartional}</h2>
    
    </div>
    
    
    </>
  )
}

export default Serving