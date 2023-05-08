import React from 'react'
import './CountryCard.css'

function CountryCard({ country }) {
  return (
    <div className='Card'>
        <div className='cardInfoTextLow'>
            <p>Country flag:</p>
        </div>
        <div className='cardFlag'>
            <img src={country.flags.png} alt="" />
        </div>
        <div className='cardInfo'>          
          <div className='cardInfoTextLow'> Country name: </div>
          <div  className='cardInfoTextHight'>{country.name.common}</div>            
        </div>
        <div className='cardInfo'>
          <div className='cardInfoTextLow'> Capital: </div>
          <div className='cardInfoTextHight'>{country.capital}</div>      
        </div>
    </div>
    
  );
}

export default CountryCard;