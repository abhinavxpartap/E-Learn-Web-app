import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { FetchCourses } from '../Redux/ReCourses.js';
import { useDispatch } from 'react-redux';



const StyledLogo = styled(Typography)`
  && {
    font-weight: bold;
    font-size: 24px;
    margin-right: 15px;
  }
`;

const StyledSearchContainer = styled('div')`
  border: 0.5px hidden lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  border-radius: 9px;
  padding: 5px;
  width: 100%;
  max-width: 400px;
`;

const StyledInput = styled('input')`
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  width: 100%;
  padding: 7px;
  font-size: 14px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  color: black;
  font-size: 10px;
  padding: 3px;
  background-color: white;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
`;

const StyledMenuItem = styled('div')`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  &:hover {
    color: blue;
  }
`;

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [search, setSearch] = useState('');
  const Nav = useNavigate()
  const dispatch = useDispatch();
  
  const handlesubmit = (e) =>{
    e.preventDefault()
    console.log(search)
    dispatch(FetchCourses(search));
    setSearch('')
  }
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledLogo component={Link} to="/Course" style={{ textDecoration: 'none', color: 'black' }}>
          ED-Tech
        </StyledLogo>

        {/* Search Container */}
        <StyledSearchContainer>
          <StyledInput placeholder="Search...."
            value={search} onChange={(e)=> setSearch(e.target.value)}
          />
          <StyledSearchIcon onClick={handlesubmit} />
        </StyledSearchContainer>

        {/* Right Section */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          <Button variant="contained" color="success" onClick={() => Nav('/student')} sx={{ display: { sm: 'block', xs: 'none' } }}>
            Student Dashboard
          </Button>

          {/* Mobile Drawer */}
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ display: { sm: 'none', xs: 'block' } }}>
            {isDrawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          {/* Desktop Navigation */}
          <div style={{ display: { sm: 'flex', xs: 'none' } }}>
            <Link to="">
              <StyledMenuItem>
                <AiOutlineShoppingCart style={{ fontSize: '25px', color: 'white' }} />
              </StyledMenuItem>
            </Link>
          </div>
        </div>
      </Toolbar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/student" onClick={toggleDrawer} sx={{ display: { sm: 'none', xs: 'block' } }}>
            <ListItemText primary="Student Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/Course" onClick={toggleDrawer} sx={{ display: { sm: 'none', xs: 'block' } }}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="" onClick={toggleDrawer} sx={{ display: { sm: 'none', xs: 'block' } }}>
            <ListItemText primary="About" />
          </ListItem>
          <ListItem button component={Link} to="" onClick={toggleDrawer} sx={{ display: { sm: 'none', xs: 'block' } }}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="" onClick={toggleDrawer} sx={{ display: { sm: 'none', xs: 'block' } }}>
            <ListItemText primary={<AiOutlineShoppingCart style={{ fontSize: '25px', color: 'white' }} />} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
