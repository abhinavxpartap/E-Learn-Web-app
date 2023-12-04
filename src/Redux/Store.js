import { configureStore } from "@reduxjs/toolkit";
import CoursesReducer from "./ReCourses"
import Coursedetail from "./Single"


export default configureStore({
   reducer:{    
     courses: CoursesReducer,
     coursedetail: Coursedetail 
   },
   
});


 
