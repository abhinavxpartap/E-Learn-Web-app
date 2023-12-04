import './App.css'
import SinglePage from './Pages/SinglePage'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import CourseList from './Pages/CourseList';
import  ViewDetail  from "./Pages/ViewDetail";


function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
       <Route path ="/Course" element={<CourseList/>}/>
       <Route path ="/Course/:id" element={<SinglePage/>}/>
       <Route path ="/student" element={<ViewDetail/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
