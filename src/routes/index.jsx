import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'

import { useEffect, useState } from 'react'
import axios from 'axios'
function AppRouter() {

  const[allCountry, setAllCountry] = useState([])
  sessionStorage.setItem("pageNum", 1);
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const result = await axios('https://restcountries.com/v3.1/all')

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

  return (
    <>
        <Routes>
            <Route path='/' element={allCountry.length ? <Home allCountry={allCountry}/> : <div>Loading...</div>} />
            <Route path="/about/:id" element={allCountry.length ? <About allCountry={allCountry}/> : <div>Loading...</div>} />
        </Routes>
    </>
  )
}

export default AppRouter
