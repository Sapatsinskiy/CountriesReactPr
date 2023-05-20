import { useEffect, useState } from "react";
import CountryList from "./CountryList";
import Pagination from "@mui/material/Pagination";
import "./Home.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
const StyledPagination = styled(Pagination)(() => ({
  "& .MuiPaginationItem-root": {
    color: "aliceblue",
    background: "rgb(40, 54, 73)",
    "&.Mui-selected": {
      background: "rgb(79, 209, 246)",
      color: "aliceblue",
      "&:hover": {
        background: "rgb(79, 209, 246)",
      },
    },
    "&:hover": {
      background: "rgb(79, 209, 246)",
    },
  },
}));

function Home({ allCountry }) {
  if (!Array.isArray(allCountry) || allCountry.length === 0) {
    return <div>Loading...</div>;
  }
  const [sortedCoutries, setSortedCountries] = useState([]);
  const [chekerAY, setChekerAY] = useState(null);
  const [cheker15, setCheker15] = useState(null);
  const [chekContinent, setChekContinent] = useState(true);
  const [chekRegion, setChekRegion] = useState(true);
  const [currentContinent, setCurrentContinent] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [countriesPerPage] = useState(10);
  const [regions, setRegion] = useState([]);

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  let countCounries = 0;
  if (sortedCoutries.length == 0) {
    countCounries = allCountry.length / 10;
  } else {
    countCounries = Math.ceil(sortedCoutries.length / 10);
  }

  if (sortedCoutries.length == 0) {
    setSortedCountries(allCountry);
  }
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountryChange = (event, newValue) => {
    if (newValue !== null) {
      navigate(`/about/${newValue.id}`);
    }
    setSelectedCountry(newValue);
  };
  const sort15_1 = () => {
    const tmp = sortedCoutries.sort(function (a, b) {
      if (a.id > b.id) {
        return -1;
      }
      if (a.id < b.id) {
        return 1;
      }
      return 0;
    });
    setSortedCountries(tmp);
    setCheker15(false);
  };
  const sort15_2 = () => {
    const tmp = sortedCoutries.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setSortedCountries(tmp);
    setCheker15(true);
  };
  const sort15 = () => {
    setChekerAY(null);
    if (cheker15 == null) {
      setCheker15(true);
      sort15_1();
    }
    if (cheker15 == true) {
      sort15_1();
    }
    if (cheker15 == false) {
      sort15_2();
    }
  };
  const sortAB_1 = () => {
    const tmp = sortedCoutries.sort(function (a, b) {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });
    setSortedCountries(tmp);
    setChekerAY(false);
  };
  const sortAB = () => {
    setCheker15(null);
    if (chekerAY == null) {
      setChekerAY(true);
      sortAB_1();
    }
    if (chekerAY == true) {
      sortAB_1();
    }
    if (chekerAY == false) {
      const tmp = sortedCoutries.sort(function (a, b) {
        if (a.name.common > b.name.common) {
          return -1;
        }
        if (a.name.common < b.name.common) {
          return 1;
        }
        return 0;
      });
      setSortedCountries(tmp);
      setChekerAY(true);
    }
  };
  useEffect(() => {
    const tmp = allCountry.reduce((acc, country) => {
      const { continents, subregion } = country;
      if (acc[continents]) {
        acc[continents].add(subregion);
      } else {
        acc[continents] = new Set([subregion]);
      }
      return acc;
    }, {});
    setRegion(tmp);
  }, [allCountry]);

  const SortByContinent = (item) => {
    if (currentContinent != item) {
      setCurrentContinent(item);
      setActiveContinent(item);
      chekContinent == true;
      const tmp = allCountry.filter(
        (obj) => String(obj.continents) === String(item)
      );
      setSortedCountries(tmp);
      setCurrentPage(1);
    }
    if (currentContinent == item) {
      setCurrentContinent(null);
      setActiveContinent(null);
      setCurrentRegion(null);
      setActiveRegion(null);
      setChekContinent(!chekContinent);
      setSortedCountries(allCountry);
    }
  };
  const SortByRegion = (item) => {
    if (currentRegion != item) {
      setCurrentRegion(item);
      setActiveRegion(item);
      chekRegion == true;
      const tmp = allCountry.filter(
        (obj) =>
          String(obj.continents) === String(currentContinent) &&
          String(obj.subregion) === String(item)
      );
      setSortedCountries(tmp);
      setCurrentPage(1);
    }
    if (currentRegion == item) {
      const tmp = allCountry.filter(
        (obj) => String(obj.continents) === String(currentContinent)
      );
      setCurrentRegion(null);
      setActiveRegion(null);
      setChekRegion(!chekRegion);
      setSortedCountries(tmp);
    }
  };
  const ResetAll = () => {
    setChekContinent(true);
    setChekRegion(true);
    setCurrentContinent(null);
    setCurrentRegion(null);
    setActiveContinent(null);
    setActiveRegion(null);
    setChekerAY(null);
    setCheker15(null);
    allCountry = allCountry.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setSortedCountries(allCountry);
  };

  return (
    <div className="CountryPanel">
      <div className="ListPanel">
        <div className="Panel">
          <div className="ListName">Country List:</div>
          <div className="FindPanel">
            <Autocomplete
              value={selectedCountry}
              onChange={handleCountryChange}
              options={allCountry}
              getOptionLabel={(option) => option.name.common}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search country"
                  variant="outlined"
                />
              )}
            />
          </div>
        </div>
        <div className="bodyPanel">
          <CountryList
            sortedCountries={sortedCoutries}
            countriesPerPage={countriesPerPage}
            currentPage={currentPage}
          />
          <div className="underPanel">
            <div className="sortPanel">
            <div
                className={`defButton bText ${
                  chekerAY != null ? "activeBut" : ""
                }`} onClick={() => sortAB()}
              >
                  {chekerAY ? "Sort A-Y" : "Sort Y-A"}
              </div>
              <div
                className={`defButton bText ${
                  cheker15 != null ? "activeBut" : ""
                }`} onClick={() => sort15()}
              >
                  {cheker15 ? "Sort ↑" : "Sort ↓"}
              </div>
              <div className="defButton bText reset" onClick={() => ResetAll()}>
                Reset all
              </div>
              {Object.keys(regions).map((item) => (
                <div
                  className={`defButton bText ${
                    activeContinent === item ? "activeBut" : ""
                  }`}
                  key={item}
                  onClick={() => SortByContinent(item)}
                >
                  {item}
                </div>
              ))}
            </div>
            
            {currentContinent && (
            <div className="sortPanel activePan">
              {Array.from(regions[currentContinent]).map((subregion) => {
                if (currentContinent != "Antarctica") {
                  return (
                    <div
                      onClick={() => SortByRegion(subregion)}
                      className={`defButton bText specBut ${
                        activeRegion === subregion ? "activeBut" : ""
                      }`}
                      key={subregion}
                    >
                      {subregion}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
          </div>
        </div>
      </div>
      <div className="PaginationBox">
        <StyledPagination
          count={countCounries}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={nextListPage}
        ></StyledPagination>
      </div>
    </div>
  );
}
export default Home;
