import { useState, useEffect } from "react";
import SortPanel from "../../Components/SortPanel";
import Pagination from "@mui/material/Pagination";
import "/src/Pages/Home/Home.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

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

function LangugePage() {
  const { selectedLanguage } = useParams();
  const [allCountry, setAllCountry] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [countriesPerPage] = useState(10);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountryChange = (event, newValue) => {
    if (newValue !== null) {
      navigate(`/about/${newValue.id}`);
    }
    setSelectedCountry(newValue);
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const result = await axios.get("http://46.101.96.179/all");

        const resultAddId = result.data.map((item, i) => {
          return { ...item, id: i + 1 };
        });

        setAllCountry(resultAddId);
      } catch {
        setAllCountry("Error");
      }
    };
    fetchCountryData();
  }, []);
  useEffect(() => {
    if (allCountry.length > 0) {
      const filtered = allCountry.filter((country) => {
        if (country.languages && typeof country.languages === "object") {
          const languageValues = Object.values(country.languages);
          return languageValues.includes(selectedLanguage);
        }
        return false;
      });
      setFilteredCountries(filtered);
      setSortedCountries(filtered);
    }
  }, [allCountry, selectedLanguage]);

  useEffect(() => {
    const countCountries = Math.ceil(sortedCountries.length / countriesPerPage);
    setCurrentPage((prevPage) => Math.min(prevPage, countCountries));
  }, [sortedCountries, countriesPerPage]);

  useEffect(() => {
    const newPageNum = Number(sessionStorage.getItem("NewPageNum"));
    if (newPageNum) {
      setCurrentPage(newPageNum);
    }
  }, []);

  const nextListPage = (e, p) => {
    sessionStorage.setItem("NewPageNum", p);
    setCurrentPage(p);
  };

  if (allCountry.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CountryPanel">
      <div className="ListPanel">
        <div className="Panel">
          <div className="ListName">{selectedLanguage} is spoken by</div>
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
          <div
            className="defButton fixDefButton bText"
            onClick={() => {
              navigate("/");
              sessionStorage.setItem("NewPageNum", 1);
            }}
          >
            Go Home
          </div>
        </div>


          <SortPanel
            allCountry={filteredCountries}
            sortedCountries={sortedCountries}  
            setSortedCountries={setSortedCountries}                     
            setCurrentPage={setCurrentPage}

            countriesPerPage={countriesPerPage}
            currentPage={currentPage}
          />

      </div>
      <div className="PaginationBox">
        <StyledPagination
          count={Math.ceil(sortedCountries.length / countriesPerPage)}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={nextListPage}
        />
      </div>
    </div>
  );
}

export default LangugePage;

