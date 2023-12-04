import React from 'react';
import { FetchCoursedetail } from '../Redux/Single.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import { Typography, Rating, Button } from "@mui/material";
import { CiBoxList } from "react-icons/ci";
import { FaExpandAlt } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";

const SingleWrapper = styled.div`
  background: var(--clr-dark);
  color: var(--clr-white);
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: rgba(1, 234, 255, 0.11);
`;

const ImgContainer = styled.div`
  height: 50vh;
  width: 100%;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(1, 234, 255, 0.11);
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Des = styled.p`
  color: black;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 2px;
  margin: 1rem 0;
  text-align: justify;
`;

const Cont = styled.div`
  background-color: rgba(251, 179, 173, 0.04);
  width: 100%;
  border: 1px solid black;
  padding-top: 10px;
  border-radius: 1%;
  box-shadow: 0px 0px 10px rgb(41, 34, 34);
  margin-top: 1rem;
`;

const Conts = styled.div`
  background-color: rgba(251, 179, 173, 0.04);
  width: 100%;
  border: 1px solid black;
  padding-top: 10px;
  border-radius: 2%;
  margin-bottom: 1rem;
`;

const SinglePage = () => {
  const coursedetail = useSelector((state) => state.coursedetail);
  const dispatch = useDispatch();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [value, setValue] = useState(2);
  const [expandLearn, setExpandLearn] = useState(false);
  
  const handleLearnToggle = () => {
    setExpandLearn(!expandLearn);
  };

  useEffect(() => {
    dispatch(FetchCoursedetail(id));
  }, [dispatch, id]);

  console.log(coursedetail);

  return (
    <>
      <SingleWrapper>
        <Navbar />
        <ImgContainer>
          <Image src={coursedetail.courses.thumbnail} alt='imge not open' />
        </ImgContainer>
        <InfoContainer>
          <div style={{ width: '100%' }}>
            <Title>{coursedetail.courses.name}</Title>
            <Des>
              {coursedetail.courses.description}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla recusandae consequuntur assumenda, perspiciatis veniam, unde facere labore placeat rem laudantium quia officiis cumque et ab blanditiis maxime expedita delectus odit repellendus doloribus ipsam? Officia tempore quaerat necessitatibus sed beatae eius consequuntur, numquam unde aperiam facilis dignissimos quidem deserunt earum minima.
            </Des>
            <Conts>
            <Typography variant="h5" onClick={handleLearnToggle} style={{ cursor: 'pointer' }}>
                <CiBoxList/> What Will You Learn <FaExpandAlt/>
              </Typography>
              {expandLearn && (
                <ul style={{ listStyleType: 'square', paddingLeft: '20px' }}>
                  {coursedetail.courses.syllabus?.map((item) => (
                    <li key={item.id}>
                      <Typography variant='body1'>WEEK {item.week} --- Topic {item.topic} </Typography>
                      <Typography variant='body1'>Content : {item.content}</Typography>
                    </li>
                  ))}
                </ul>
              )}
            </Conts>
          </div>
          <Cont>
            <div style={{ margin: "5px" }}>
              <Typography variant="h5"> <FaHandPointRight/> Instructor Name:
                {coursedetail.courses.instructor}</Typography>
              <Typography variant='h6' > <FaHandPointRight/> Enrollment Status:{coursedetail.courses.enrollmentStatus}</Typography>
              <Typography variant='h6'> <FaHandPointRight/> Prerequisites for the Course: 
              <br/>
              {coursedetail.courses.prerequisites}</Typography>
              <Typography variant='h6'><FaHandPointRight/> Duration:{coursedetail.courses.duration}</Typography>
              <Typography variant='body1'><FaHandPointRight/> Location: {coursedetail.courses.location}</Typography>
              <Typography variant='body1'> <FaHandPointRight/>Schedule :{coursedetail.courses.schedule}</Typography>
              <Typography variant="body2" color="text.secondary">
              <FaHandPointRight/> Rating
              </Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                size="small"
              />
            </div>
            <Button variant="contained"
              disabled={coursedetail.courses.enrollmentStatus !== 'Open'}
              size="small"
              sx={{ margin: "5px" }}>ENROLL NOW</Button>
          </Cont>
        </InfoContainer>
      </SingleWrapper>
    </>
  )
}

export default SinglePage;
