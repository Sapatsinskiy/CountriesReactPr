import { useNavigate, useParams } from 'react-router-dom';
import './About.css'

function About({allCountry}) {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!Array.isArray(allCountry) || allCountry.length === 0) {
    return <div>Loading...</div>
  }

  const findCountry = allCountry.find((country) => country.id == id);

  let BorderCountries = ""
  if (findCountry.borders) {
    allCountry.forEach((item)=>{
      if(findCountry.borders.includes(item.cca3)){
        BorderCountries += item.name.common + ", "
      }
    });
  } else {
    BorderCountries = "Nothing  "
  }

  return (
    <>
    <div className='countryInfoBlock'>
      <div className='panelNav cardInfoTextHight'>
        <div className='ButtonCustom' onClick={() => navigate(-1)}> Go back </div>
        <div className='ButtonCustom' onClick={() => window.open(findCountry.maps.googleMaps)}> Go to the map </div>
      </div>
      
      <div className='infoPanel'>
        <div className='widthBlock'>
          <div className='block flagBlock'>
            <div className='cardInfoTextLow'>
            Сountry flag:   
            </div>                 
            <img className='flag' src={findCountry.flags.png} alt="" />
          </div>
          <div className='coatOfArmsBlock block'>
              <div className='cardInfoTextLow'>
                Coat of arms:
              </div>
              {findCountry.coatOfArms?.png ? (
                <img className='coatOfArms' src={findCountry.coatOfArms.png} alt="" /> 
              ) : (
                <div className='cardInfoTextHight'>Nothing</div>
              )}
            </div>
        </div>
        
        <div className='Rotate'>
          <div className='infoBlock'>
            <div className='block specBlock'>
              <div className='cardInfoTextLow'>Country name:</div>
              <div className='cardInfoTextHight'>{findCountry.name.common}</div>
            </div>
            <div className='block specBlock'>
              <div className='cardInfoTextLow'>Country capital:</div>
              <div className='cardInfoTextHight'>{findCountry.capital}</div>
            </div>
            <div className='block specBlock'>
            <div className='cardInfoTextLow'>Population:</div>
            <div className='cardInfoTextHight'>{findCountry.population}</div>
          </div>
          </div>
          <div className='infoBlock'>
            <div className='block specBlock'>
              <div className='cardInfoTextLow'>Region:</div>
              <div className='cardInfoTextHight'>{findCountry.region}</div>
            </div>
            <div className='block specBlock'>
              <div className='cardInfoTextLow'>Subregion:</div>
              <div className='cardInfoTextHight'>{findCountry.subregion}</div>
            </div>
            <div className='block specBlock'>        
              <div className='cardInfoTextLow'>Languages:</div>
              <div className='cardInfoTextHight'>{Object.values(findCountry.languages).join(', ')}</div>
            </div>
          </div>
        </div>

        <div className='block specBlock'>        
          <div className='cardInfoTextLow'>Borders:</div>
          <div className='cardInfoTextHight'>{BorderCountries.slice(0, -2)}</div>
        </div>
      </div>
    </div>     
    </>
  );
}

export default About;
