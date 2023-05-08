import './CountryList.css'
import CountryCard from './CountryCard';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function CountryList({allCountry}){

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleMouseEnter = (id) => {
    setSelectedCountry(allCountry.find((country) => country.id === id));
  }
  const handleMouseLeave = () => {
    setSelectedCountry(null);
  }

    if(allCountry.length===0){
        return(
          <div>
           loading...
          </div> 
        )
      }

    return (
    <div className='countryPanel'>
      
        <div className="countryList">
        {allCountry.map((item)=>(
          <Link
            key={item.id}
            to={`/about/${item.id}`}
            className={`countryItem ${selectedCountry?.id === item.id ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={() => handleMouseLeave()}>
            <div className ='leftItem'>
              <div className='index'>{item.id}</div>
              <img className='leftItemImg' src={item.flags.png} alt="" />
            </div>
            <div className='rightItem'> {item.name.common}</div>
          </Link>
        ))}              
          {/* <Link to = '/about'>About</Link> */}
        </div>
    <div className='countryCard'>
    {selectedCountry && <CountryCard country={selectedCountry} />}    
    </div>
    </div>
       
    )
}
export default CountryList