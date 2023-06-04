import { useNavigate, useParams } from "react-router-dom";
import {useState, useEffect } from "react";
import "./About.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Link } from 'react-router-dom';
import axios from "axios";
import Map from "../../Components/Map";
function About() {
  const[allCountry, setAllCountry] = useState([])
  const navigate = useNavigate();
  const { id } = useParams();
  const findCountry = allCountry.find((country) => country.id == id);
  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const result = await axios('http://46.101.96.179/all')

        const resultAddId = result.data.map((item, i) => {
          return{...item, id: i+1 }
        })
        setAllCountry(resultAddId)
      }
      catch{
        setAllCountry('Error')
      }   
    }
    fetchCountryData()
  }, [])
  if (allCountry.length === 0) {
    return <div>Loading...</div>
  }

  let Bordered = [];
  if(findCountry.borders){
    findCountry.borders.forEach(function(border) {
      allCountry.forEach(function(country) {
        if (border === country.cca3) {
          Bordered.push(country);
        }
      });
    });
  }
  return (
    <>
      <div className="countryInfoBlock">
        <div className="panelNav cardInfoTextHight">
          <div className="ButtonCustom" onClick={() => navigate(-1)}>
            Go back
          </div>
          <div className="ButtonCustom" onClick={() => navigate("/")}>
            Go Home
          </div>
        </div>

        <div className="infoPanel">
          <div className="widthBlock">
            <div className="block flagBlock">
              <div className="cardInfoTextLow">Сountry flag:</div>
              <img className="flag" src={findCountry.flags.png} alt="" />
            </div>
            <div className="coatOfArmsBlock block">
              <div className="cardInfoTextLow">Coat of arms:</div>
              {findCountry.coatOfArms?.png ? (
                <img
                  className="coatOfArms"
                  src={findCountry.coatOfArms.png}
                  alt=""
                />
              ) : (
                <div className="cardInfoTextHight">Nothing</div>
              )}
            </div>
          </div>
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  textColor="inherit"
                  indicatorColor="primary"
                  centered
                >
                  <Tab label="Basic" value="1" />
                  <Tab label="More" value="2" />
                  <Tab label = "Map" value="3"/>
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ marginTop: "-3%" }}>
                <div className="block specBlock">
                      <div className="cardInfoTextLow">Country name:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.name?.common || "Nothing"}
                      </div>
                    </div>
                <div className="Rotate">
                  <div className="infoBlock">
                    
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Country capital:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.capital || "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Population:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.population || "Nothing"}
                      </div>
                    </div>
                  </div>
                  <div className="infoBlock">
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Region:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.region || "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Subregion:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.subregion || "Nothing"}
                      </div>
                    </div>

                  </div>
                </div>
                <div className="block specBlock ">
                      <div className="cardInfoTextLow">Languages:</div>
                      <div className="cardInfoTextHight Rotate blockMin">
                      {findCountry.languages
                          ? Object.values(findCountry.languages).map(
                              (item) => (
                                <div
                                onClick={() => {
                                  navigate(`/LanguagePage/${item}`);
                                  sessionStorage.setItem("NewPageNum", 1);
                                }}
                                key={item}
                                  className="buttonLan"
                                  
                                >
                                  <div>{item}</div>
                                </div>
                              )
                            )
                          : "Nothing"}
                      </div>
                    </div>
                <div className=" block specBlock">
                  <div className="cardInfoTextLow">Borders:</div>
                  <div className="Rotate blockMin">
                  {Bordered.length==0 ?"Nothing" :Bordered.map((item)=>(
                      <Link key={item.cca3} className=" buttonLan butLanCol" to={`/About/${item.id}`}>
                        <div className="cardInfoTextHight">{item.name.common}</div>
                      </Link>
                      
                    ))}
                  </div>

                </div>
              </TabPanel>
              <TabPanel value="2" sx={{ marginTop: "-3%" }}>
                <div className="Rotate">
                  <div className="infoBlock">
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Official name:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.name?.official || "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Independent:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.independent === false
                          ? "Dependent"
                          : "Independence"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Status:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.status || "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">
                        Member of the United Nations:
                      </div>
                      <div className="cardInfoTextHight">
                        {findCountry.unMember === false
                          ? "Not a member of the union"
                          : "Union member"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Currencies:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.currencies
                          ? Object.keys(findCountry.currencies).map(
                              (currency, index) => (
                                <React.Fragment key={currency}>
                                  {index > 0 && ", "}
                                  {findCountry.currencies[currency].name}
                                </React.Fragment>
                              )
                            )
                          : "Nothing"}
                      </div>
                    </div>
                  </div>
                  <div className="infoBlock">
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Timezones:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.timezones
                          ? findCountry.timezones.join(", ")
                          : "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Leading side:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.car?.side || "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Start of week:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.startOfWeek || "Nothing"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Landlocked:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.landlocked === false
                          ? "Has access to the sea"
                          : "No access to the sea"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Area:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.area
                          ? `${findCountry.area} km²`
                          : "Nothing"}
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="3"  sx={{ marginTop: "-3%" }}>
                <div>
                <Map element={findCountry}/>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </>
  );
}

export default About;
