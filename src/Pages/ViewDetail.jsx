import { useState , useEffect} from 'react'
import React from 'react'
import {styled} from '@mui/material/styles'
import { Typography,LinearProgress, Button} from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { FetchCourses } from '../Redux/ReCourses.js';
import Navbar from "../components/Navbar"


const Cont = styled('div')({
    marginLeft: "50px",
    '@media only screen and (max-width: 768px)': {
    marginLeft: "10px"
    }
})

const Table = styled('table')({
   
    width: '90%',
    marginRight: '10px',
    marginBottom:"10px",
    fontSize:'20px',
    '@media only screen and (max-width: 768px)': {
        marginLeft: "5px",
        width: '35%',
        marginRight: '5px',
        fontSize:'10px',
    },
    
})
const Thead = styled('thead')({
    textAlign: 'center',
    width: '100%' 
})
const Td = styled('td')({
    border: '1px solid gray',
    textAlign: 'left',
    padding: '5px',
})
const Th = styled('th')({
    border: '1px solid gray',
    textAlign: 'left',
    padding: '8px',
})
const Img = styled('img')({
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px'
    
}) 

const ProgressContainer = styled('div')({
    width: '70%',
    padding: '5px',
  });


function ViewDetail() {
    
  const Courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const search = '' ;
  useEffect(() => {
    dispatch(FetchCourses(search));
  }, [dispatch]);

  return (
    <div >
    <Navbar/>
      <Typography variant='h3' sx={{ textAlign:'center' ,marginBottom:'10px'}}>Student DashBord</Typography>
      <Cont>
      <Table className=''>
        <Thead>
            <tr>    
            <Th>SNo.</Th>
            <Th>Course</Th>
            <Th>Course Title</Th>
            <Th>Course Instructor</Th>
            <Th>Course Status</Th>
            <Th>Course Duration</Th>
            <Th>Action</Th>
            </tr>
        </Thead>
        <tbody>
            { Courses.courses?.slice(0,9).map((item ,index)=>{
                return(
                    <tr key={index}>
                        <Th scope='row'>{index + 1}</Th>
                    <Td><Img src={item.thumbnail}></Img></Td>
                    <Td>{item.name}</Td>
                    <Td>{item.instructor}</Td>
                    <Td>
                    <ProgressContainer>
                      <LinearProgress variant="determinate" value={30} />
                    </ProgressContainer>
                    </Td>
                    <Td>{item.duration}</Td>
                   <Td>
                    <Button variant="outlined" color="error" size='small'
                    >Mark Done</Button>
                   </Td>
                    </tr>
                )
            })}
        </tbody>
      </Table>
      </Cont>
    </div>
  )
}

export default ViewDetail
