import { useState,useEffect} from "react";
import "/src/Pages/Home/Home.css";
import CountryList from "../CountryList";

function SortPanel({
  allCountry,
  sortedCountries,
  setSortedCountries,
  setCurrentPage,
  countriesPerPage,
  currentPage
}) {
  const [chekerAY, setChekerAY] = useState(null);
  const [cheker15, setCheker15] = useState(null);
  const [chekContinent, setChekContinent] = useState(true);
  const [chekRegion, setChekRegion] = useState(true);
  const [currentContinent, setCurrentContinent] = useState(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [activeContinent, setActiveContinent] = useState(null);
  const [activeRegion, setActiveRegion] = useState(null);
  const [regions, setRegion] = useState({});
  const sort15_1 = () => {
    const tmp = sortedCountries.sort(function (a, b) {
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
    const tmp = sortedCountries.sort(function (a, b) {
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
    if (cheker15 === null) {
      setCheker15(true);
      sort15_1();
    }
    if (cheker15 === true) {
      sort15_1();
    }
    if (cheker15 === false) {
      sort15_2();
    }
  };

  const sortAB_1 = () => {
    const tmp = sortedCountries.sort(function (a, b) {
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
    if (chekerAY === null) {
      setChekerAY(true);
      sortAB_1();
    }
    if (chekerAY === true) {
      sortAB_1();
    }
    if (chekerAY === false) {
      const tmp = sortedCountries.sort(function (a, b) {
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
    setRegion({ ...tmp });
  }, [allCountry, setRegion]);

  const SortByContinent = (item) => {
    if (currentContinent !== item) {
      setCurrentContinent(item);
      setActiveContinent(item);
      setChekContinent(true);
      const tmp = allCountry.filter(
        (obj) => String(obj.continents) === String(item)
      );
      setSortedCountries(tmp);
      setCurrentPage(1);
      setCheker15(null)
      setChekerAY(null)
    }
    if (currentContinent === item) {
      setCurrentContinent(null);
      setActiveContinent(null);
      setCurrentRegion(null);
      setActiveRegion(null);
      setChekContinent(!chekContinent);
      setSortedCountries(allCountry);
    }
  };

  const SortByRegion = (item) => {
    if (currentRegion !== item) {
      setCurrentRegion(item);
      setActiveRegion(item);
      setChekRegion(true);
      const tmp = allCountry.filter(
        (obj) =>
          String(obj.continents) === String(currentContinent) &&
          String(obj.subregion) === String(item)
      );
      setSortedCountries(tmp);
      setCurrentPage(1);
      setCheker15(null)
      setChekerAY(null)
    }
    if (currentRegion === item) {
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
    const tmp = allCountry.sort(function (a, b) {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    setSortedCountries(tmp);
  };

  return (
    <div className="bodyPanel">
      <CountryList
            sortedCountries={sortedCountries}
            countriesPerPage={countriesPerPage}
            currentPage={currentPage}
          />
              <div className="underPanel">
      <div className="sortPanel">
        <div className="minPan">
        <div
          className={`defButton bText ${chekerAY !== null ? "activeBut" : ""}`}
          onClick={() => sortAB()}
        >
          {chekerAY ? "Sort A-Y" : "Sort Y-A"}
        </div>
        <div
          className={`defButton bText ${
            cheker15 !== null ? "activeBut" : ""
          }`}
          onClick={() => sort15()}
        >
          {cheker15 ? "Sort ↑" : "Sort ↓"}
        </div>
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
            if (currentContinent !== "Antarctica") {
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

  );
}

export default SortPanel;
