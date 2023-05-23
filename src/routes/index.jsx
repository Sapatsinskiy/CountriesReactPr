import {Route, Routes} from 'react-router-dom'
import Home from '../Pages/Home'
import About from '../Pages/About'
import LangugePage from '../Pages/LanguagePage'
function AppRouter() {

  sessionStorage.setItem("pageNum", 1);
  return (
    <>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path="/about/:id" element={<About/>}/>
            <Route path="/LanguagePage/:selectedLanguage" element={<LangugePage/>} />
        </Routes>
    </>
  )
}

export default AppRouter
