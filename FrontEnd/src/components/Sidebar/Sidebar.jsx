import React from 'react'
import { navigationMenu } from './SidebarNavigation'
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (item) => {
    if(item.title === 'Profile') 
      navigate(`/profile/${auth.user?.id}`);

    if(item.title === 'Home')
      navigate(`/`)

    if(item.title === 'Message')
      navigate(`/message`)
  };

  return (
    <Card className='card h-screen flex flex-col justify-between py-5'>
      <div className="space-y-8 pl-5">
        <div className="">
          <span className='logo font-bold text-xl'>Zosh Social</span>
        </div>
        <div className="space-y-8">
          {navigationMenu.map((item) => <div key={item.title} className='flex space-x-3 cursor-pointer' onClick={() => handleNavigate(item)}>
            {item.icon}
            <p className='text-xl'>{item.title}</p>
          </div>)}
        </div>
      </div>

      <div>
        <Divider />
        <div className="pl-5 flex items-center justify-between pt-5">
          <div className="flex items-center space-x-3">
            <Avatar src='https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png' />
            <div>
              <p className='font-bold'>{auth.user?.firstName + " " + auth.user?.lastName}</p>
              <p className='opacity-70'>@{(auth.user.firstName + "_" + auth.user.lastName).toLowerCase()}</p>
            </div>
          </div>

          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  )
}

export default Sidebar