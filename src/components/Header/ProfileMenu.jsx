import * as React from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import './Header.css';

export default function BasicMenu({ token }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignup = () => {
    handleClose();
    navigate('/register');
  };

  const handleLogin = () => {
    handleClose();
    navigate('/');
    localStorage.removeItem('token');
  };

  const handleProfile = () => {
    handleClose();
    navigate('/userprofile');
  };


  return (
    <div>
      <div
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='profile-menu-flex'
      >
        <MenuRoundedIcon />
        <AccountCircleRoundedIcon />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          ".MuiPaper-root": {
            minWidth: "200px",
            borderRadius: "1rem",
            boxShadow: "0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%)",
          },
        }}
      >

        {
          token ? (
            <MenuItem onClick={handleProfile} className="menu-items">My profile</MenuItem>
          ) : (
            <MenuItem onClick={handleLogin} className="menu-items">Login</MenuItem>
          )
        }

        {
          token ? (
            <MenuItem onClick={handleLogin} className="menu-items">Logout</MenuItem>
          ) : (
            <MenuItem className="menu-items" onClick={handleSignup}>Sign up</MenuItem>
          )
        }

        <div style={{
          height: "1px",
          backgroundColor: "var(--grey)",
          width: "100%"
        }}
        />


      </Menu>
    </div >
  );
}