import React from 'react';

function sectorDropDown({ sectors, selectedSector, setSelectedSector }) {

  const handleCheck = (id, value) => {
    if(!selectedSector.includes(value)){
        setSelectedSector([
            ...selectedSector,
            value
        ])
    }else{
        setSelectedSector(selectedSector.filter(item => item !== value))
    }
  }

  return (
    <div className="sectorWrap">
      {
        sectors.map((item, index) => {
            return(
                <div key={index} className="sectorItem">
                    <input type="checkbox" onChange={() => handleCheck(item.id, item.name)}/>
                    <p>{item.name}</p>
                </div>
            )
        })
      }
    </div>
  )
}

export default sectorDropDown;
