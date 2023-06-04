import {useState, useEffect } from "react";
import SortPanel from "../../Components/SortPanel";
import Pagination from "@mui/material/Pagination";
import "./Home.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router";
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

function Home() {
  const[allCountry, setAllCountry] = useState([])
  const [sortedCountries, setSortedCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [countriesPerPage] = useState(10);

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };

  let countCountries = 0;
  if (sortedCountries.length === 0) {
    countCountries = Math.ceil(allCountry.length / 10);
  } else {
    countCountries = Math.ceil(sortedCountries.length / 10);
  }



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
        const result = await axios.get('http://46.101.96.179/all')

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

  useEffect(()=>{
    if (sortedCountries.length === 0) {
      setSortedCountries(allCountry);
    }
  },[sortedCountries, allCountry])

  if (allCountry.length === 0) {
    return <div>Loading...</div>
  }
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
          <SortPanel
            allCountry={allCountry}
            sortedCountries={sortedCountries}  
            setSortedCountries={setSortedCountries}                     
            setCurrentPage={setCurrentPage}
            setAllCountry ={setAllCountry}
            countriesPerPage={countriesPerPage}
            currentPage={currentPage}
          />
      </div>
      <div className="PaginationBox">
        <StyledPagination
          count={countCountries}
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={nextListPage}
        />
      </div>
    </div>
  );
}

export default Home;
