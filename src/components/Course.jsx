import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FetchCourses } from '../Redux/ReCourses.js';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: visible; 
`;

const CardWrapper = styled.div`
  margin-bottom: 7px;
  width: calc(25% - 7px);
  @media (max-width: 1200px) {
    width: calc(33.33% - 7px);

  }
  @media (max-width: 900px) {
    width: calc(50% - 7px);

  }
  @media (max-width: 600px) {
    width: 100%;

  }
`;

const Course = () => {
  const [value, setValue] = useState(2);

  const Courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const Nav = useNavigate()
  const search = '' ;
  useEffect(() => {
    dispatch(FetchCourses(search));
  }, [dispatch]);

  return (
    <Container>
      {Courses.courses?.map((item) => (
        <CardWrapper key={item.id}>
          <Card sx={{ maxWidth: 345 }} >
            <CardMedia sx={{ height: 150, cursor:"pointer" }}
             image={item.thumbnail} 
            title={item.name} 
            onClick={()=>Nav(`${item.id}`)}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography gutterBottom variant="body1" component="div">
                Instructor Name: {item.instructor}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Duration: {item.duration}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Rating
              </Typography>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                size="small"
              />
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>Nav(`${item.id}`)}>Learn More</Button>
            </CardActions>
          </Card>
        </CardWrapper>
      ))}
      <Pagination sx={{ marginLeft: "auto", marginTop: "10px" }} count={10} color="primary" />
    </Container>
  );
};

export default Course;
