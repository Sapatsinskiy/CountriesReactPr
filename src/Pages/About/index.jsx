import { useNavigate, useParams } from "react-router-dom";
import "./About.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

function About({ allCountry }) {
  const navigate = useNavigate();
  const { id } = useParams();
  if (!Array.isArray(allCountry) || allCountry.length === 0) {
    return <div>Loading...</div>;
  }

  const findCountry = allCountry.find((country) => country.id == id);

  let BorderCountries = "";
  if (findCountry.borders) {
    allCountry.forEach((item) => {
      if (findCountry.borders.includes(item.cca3)) {
        BorderCountries += item.name.common + ", ";
      }
    });
  } else {
    BorderCountries = "Nothing  ";
  }

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="countryInfoBlock">
        <div className="panelNav cardInfoTextHight">
          <div className="ButtonCustom" onClick={() => navigate(-1)}>
            {" "}
            Go back{" "}
          </div>
          <div
            className="ButtonCustom"
            onClick={() => window.open(findCountry.maps.googleMaps)}
          >
            {" "}
            Go to the map{" "}
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
                </TabList>
              </Box>
              <TabPanel value="1" sx={{ marginTop: "-3%" }}>
                <div className="Rotate">
                  <div className="infoBlock">
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Country name:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.name.common}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Country capital:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.capital}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Population:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.population}
                      </div>
                    </div>
                  </div>
                  <div className="infoBlock">
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Region:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.region}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Subregion:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.subregion}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Languages:</div>
                      <div className="cardInfoTextHight">
                        {Object.values(findCountry.languages).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="block specBlock">
                  <div className="cardInfoTextLow">Borders:</div>
                  <div className="cardInfoTextHight">
                    {BorderCountries.slice(0, -2)}
                  </div>
                </div>
              </TabPanel>
              <TabPanel value="2" sx={{ marginTop: "-3%" }}>
                <div className="Rotate">
                  <div className="infoBlock">
                  <div className="block specBlock">
                      <div className="cardInfoTextLow">Official name:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.name.official}
                      </div>
                    </div>
                  <div className="block specBlock">
                      <div className="cardInfoTextLow">Independent:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.independent == false ? "dependent" : "independence"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Status:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.status}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Member of the United Nations:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.unMember == false ? "not a member of the union" : "union member"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Currencies:</div>
                      <div className="cardInfoTextHight">
                        {Object.keys(findCountry.currencies).map(
                          (currency, index) => (
                            <React.Fragment key={currency}>
                              {index > 0 && ", "}
                              {findCountry.currencies[currency].name}
                            </React.Fragment>
                          )
                        )}
                      </div>
                    </div>
                    
                  </div>
                  <div className="infoBlock">
                  <div className="block specBlock">
                      <div className="cardInfoTextLow">Timezones:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.timezones.join(", ")}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Leading side:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.car.side}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Start of week:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.startOfWeek}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Landlocked:</div>
                      <div className="cardInfoTextHight">
                        {findCountry.landlocked == false ? "has access to the sea" : "no access to the sea"}
                      </div>
                    </div>
                    <div className="block specBlock">
                      <div className="cardInfoTextLow">Area:</div>
                      <div className="cardInfoTextHight">
                      {findCountry.area} km&sup2;
                      </div>
                    </div>
                  </div>
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
