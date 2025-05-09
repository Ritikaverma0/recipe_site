import React, { useRef, useState,useEffect } from 'react'
import Serving from './serving';
import { createContext } from 'react';
export const userContext=createContext();

const Main = () => {
  
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("grams");
  const [arr, setArr] = useState([]);
  const [id, setId] = useState()
  const inputRef=useRef(0);


  const Add =()=>{
    if(!name||!quantity||!unit)return alert("Please Fill all the Fields")
    setArr([...arr, { id:id, name: name, quantity: quantity, unit: unit }])
    setId(id+1)
    setName("");
    setQuantity("");
    setUnit("");

     
  
  }
  
  const Edit= ()=>{    
     inputRef.current.focus()
  }
  const saveRecipeAsJSON = () => {
  const dataStr = JSON.stringify(arr, null, 2); 
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = "recipe.json";
  link.click();
  URL.revokeObjectURL(url);
};
const loadRecipeFromFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const json = JSON.parse(event.target.result);
      setArr(json);
    } catch (err) {
      alert("Invalid JSON file");
    }
  };
  reader.readAsText(file);
};
 useEffect(() => {
    const saved = localStorage.getItem("recipes");
    if (saved) {
      setArr(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(arr));
  }, [arr]);
  return (
    <>
    
    <userContext.Provider value={{unit,setQuantity,quantity}}>
      
      <Serving/>
      <br></br>
      <form style={{ width: '200px', height: 'auto', textAlign: 'center', border:'2px black solid' }}>
        <div>
          <br></br>
          <label for='title'>Name of Ingredients:</label>
          <input type='text' id='title' maxLength={15} value={name} onChange={e => setName(e.target.value) }ref={inputRef} required></input></div>
        <div>
          <label for='quan'>Quantity: </label>
          <input type='Number' max={100} id='quan' min={0} value={quantity} onChange={e => setQuantity(e.target.value)}required></input></div>
        <div>
          <label for='unit'>Quantity's Unit:</label>
          <input type='text' id='unit' placeholder='Units: gram,ml,cups,kg' value={unit} onChange={e => setUnit(e.target.value)}required></input></div>

        <button type='button' onClick={()=>Add(id)}>Add</button>
        
        <ul>
          {arr.map((items, index) => <li key={items.index}>Ingedient Name:{items.name}<br />Quantity:{items.quantity}<br />Unit:{items.unit} 
          <button type='button' onClick={()=>{setArr(arr.filter((_,item) => item.index !==items.index));}} >Delete the Item</button >
          <button type='button' onClick={Edit}>Edit this Item</button>

           </li>)}
         
        </ul>
        <button onClick={saveRecipeAsJSON}>Download Recipe as JSON</button>
        <input type="file" accept="application/json" onChange={loadRecipeFromFile} />
      </form>
      

    </userContext.Provider>
    </>

  )

}

export default Main
