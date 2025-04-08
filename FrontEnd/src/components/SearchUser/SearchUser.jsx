import { Avatar, Card, CardHeader } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../Redux/Auth/auth.action';
import { createChatAction } from '../../Redux/Message/message.action';

const SearchUser = () => {

  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  const { message, auth } = useSelector(store => store);

  const handleSearchUser = (e) => {
    setUsername(e.target.value);
    console.log("search user....", auth.searchUser);
    dispatch(searchUserAction(username));
  };

  const handleClick = (id) => {
    dispatch(createChatAction({ userId: id }));
  };

  return (
    <div>
      <div className="py-5 relative">
        <input type="text" className="bg-transparent border border-[#3b4054] outline-none w-full px-5 py-3 rounded-full"
          placeholder='search user...'
          onChange={handleSearchUser} />

        {
          username && (
            auth.searchUser.map((item) => <Card className='absolute w-full z-10 top-[4.5rem] cursor-pointer' key={item.id}>
              <CardHeader onClick={() => {
                handleClick(item.id);
                setUsername("");
              }}
                avatar={<Avatar src='https://images.pexels.com/photos/29835052/pexels-photo-29835052/free-photo-of-catholic-priest-in-vatican-city-garden.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />}
                title={item.firstName + " " + item.lastName}
                subheader={("@" + item.firstName + "_" + item.lastName).toLocaleLowerCase()}
              />
            </Card>)
          )
        }

      </div>


    </div>
  )
}

export default SearchUser