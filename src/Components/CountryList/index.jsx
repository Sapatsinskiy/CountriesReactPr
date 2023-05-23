import './CountryList.css'
import CountryCard from './CountryCard';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function CountryList({sortedCountries,countriesPerPage, currentPage}){

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleMouseEnter = (item) => {
    setSelectedCountry(item);
  }
  const handleMouseLeave = () => {
    setSelectedCountry(null);
  }

    if(!Array.isArray(sortedCountries)||sortedCountries.length===0){
        return(
          <div>
           loading...
          </div> 
        )
      }

      const lastCountriesIndex = currentPage * countriesPerPage
      const firstCountriesIndex = lastCountriesIndex - countriesPerPage
    
      const currentCountries = sortedCountries.slice(
        firstCountriesIndex,
        lastCountriesIndex
      )

    return (
    <div className='countryPanel'>
      
        <div className="countryList">
        {currentCountries.map((item)=>(
          <Link
            key={item.id}
            to={`/about/${item.id}`}
            className={`countryItem ${selectedCountry?.id === item.id ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={() => handleMouseLeave()}>
            <div className ='leftItem rightItem'>
              <div className='index'>{item.id}</div>
              <img className='leftItemImg' src={item.flags.png} alt="" />
            </div>
            <div className='rightItem'> {item.name.common}</div>
          </Link>
        ))}              
        </div>
    <div className='countryCard'>
    {selectedCountry && <CountryCard country={selectedCountry} />}    
    </div>
    </div>
       
    )
}
export default CountryList