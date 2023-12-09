import React, { useState } from "react";
import "./sector.css";
import SectorDropDown from "./sectorDropDown";
import Axios from "axios";
import { useLocation } from 'react-router-dom';

function Sector(){
  const { state } = useLocation();

  const [ isOptionOpen, setIsOptionOpne ] = useState(false);
  const [ userName, setUserName] = useState("");
  const [ selectedSector, setSelectedSector ] = useState([]);
  const [ isChecked, setChecked ] = useState(false);

  const sectors = [ 
    {
      "id":1,
      "name":"Manufacturing"
    }, 
    {
      "id":2,
      "name":"Construction materials"
    }, 
    {
      "id":3,
      "name":"Electronics and Optics",
    },
    {
      "id":4,
      "name":"Food and Beverage",
    }, 
    {
      "id":5,
      "name":"Bakery & Confectionery products"
    }
   ]

  const toggleSector = () => {
      if(!isOptionOpen){
        setIsOptionOpne(true)
      }else{
        setIsOptionOpne(false)
      }
  }

  const handleOnchange = (e) => {
    const { value } = e.target;
    setUserName(value)
  }

  const handleAgreement = (e) => {
      setChecked(!isChecked)
  }

  const handleSubmit = () => {
    console.log(selectedSector)
    Axios.post("https://sectorspace-production.up.railway.app/api/v1/sector/create", {
      "agreeToTerms":isChecked,
      "sectorValue":selectedSector,
      "userId":state.id,
      "userName":userName,
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  return(
    <div className="sector">
      <div className="sector-form">
      <h1> Please enter name and pick the Sector  </h1> 
          <div className="container">
          <h2>Name:</h2>
          <input type="text" value={userName} className="text-field" placeholder="Enter your name" onChange={handleOnchange}/>
      </div>
      <div className="container">
          <h2>Sector:</h2>
          <div className="sector-num" onClick={toggleSector}>
            <p>{selectedSector ? selectedSector.length : 0} <span>Item</span></p>
          </div>
      </div>
      <div>
        {isOptionOpen && <SectorDropDown sectors={sectors} selectedSector={selectedSector} setSelectedSector={setSelectedSector}/>}
      </div>
      <form>
            <label>
            <input type="checkbox" id="agree" checked={isChecked} onChange={handleAgreement} required/>
                Agree to terms
            </label>
            <button type="button" onClick={handleSubmit}>SAVE</button>
      </form>
    </div>  
  </div>
  )    
}
export default Sector;