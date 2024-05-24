import React from 'react'
import './Header.css';
import logo from './../../assets/img/logoCoffeeAndCode.jpg'
import SearchIcon from '@mui/icons-material/Search';
import BasicMenu from './ProfileMenu';
import { Input } from "../Input"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export const Header = ({ token }) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(!show);
  };

  const handleHotel = () => {
    navigate('/home');
  };

  const handleRoom = () => {
    navigate('/room');
  };

  return (
    <div className="navbar-h">
      <img src={logo} alt='logo' className='navbar-logo' />
      <div className='profile-container'>
        <div className='profile-div'>
          <BasicMenu token={token}/>
        </div>
      </div>
    </div>
  )
}
