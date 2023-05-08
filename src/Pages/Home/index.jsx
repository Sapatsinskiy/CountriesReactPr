import { useState } from 'react'
import CountryList from './CountryList'
import Pagination from '@mui/material/Pagination'
import './Home.css'

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles'
const StyledPagination = styled(Pagination)(() => ({
  '& .MuiPaginationItem-root': {
    color: 'aliceblue',
    background: 'rgb(40, 54, 73)',
    '&.Mui-selected': {
      background: 'rgb(79, 209, 246)',
      color: 'aliceblue',
      '&:hover': {
        background: 'rgb(79, 209, 246)',
      },
    },
    '&:hover': {
      background: 'rgb(79, 209, 246)',
    },
  },
}))

function Home({ allCountry }) {
  if (!Array.isArray(allCountry) || allCountry.length === 0) {
    return <div>Loading...</div>
  }

  const [currentPage, setCurrentPage] = useState(
    Number(sessionStorage.getItem("pageNum"))
  );
  const [countriesPerPage] = useState(10)

  const nextListPage = (e, p) => {
    sessionStorage.setItem("pageNum", p);
    setCurrentPage(p);
  };
  
  const lastCountriesIndex = currentPage * countriesPerPage
  const firstCountriesIndex = lastCountriesIndex - countriesPerPage
  const currentCountries = allCountry.slice(firstCountriesIndex, lastCountriesIndex)

  const [selectedCountry, setSelectedCountry] = useState(null);
  const handleCountryChange = (event, newValue) => {
    if (newValue !== null) {
      window.location.href = `/about/${newValue.id}`;
    }
    setSelectedCountry(newValue);
  };
  return (
    <div className='CountryPanel'>
      <div className='Panel'>
          <div className='ListName'>
            Country List:
          </div>
        <div className='FindPanel'>
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
      <CountryList allCountry={currentCountries} />
      <div className='PaginationBox'>
        <StyledPagination count={25} page={currentPage} variant="outlined" shape="rounded" onChange={nextListPage}></StyledPagination>
      </div>
    </div>
  )
}
export default Home
