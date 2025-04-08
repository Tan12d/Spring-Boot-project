import { Avatar, Box, Button, Card, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import PostCard from '../../components/Post/PostCard';
import UserReelCard from '../../components/Reels/UserReelCard';
import { useSelector } from 'react-redux';
import ProfileModal from './ProfileModal';

const Profile = () => {

  const { auth } = useSelector(store => store);

  const { id } = useParams();

  const [value, setValue] = React.useState('post');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(false);
  const handleOpenProfileModal = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const tabs = [
    {
      value: "post",
      name: "Post"
    },
    {
      value: "reels",
      name: "Reels"
    },
    {
      value: "saved",
      name: "Saved"
    },
    {
      value: "repost",
      name: "Repost"
    }
  ];

  const posts = [1, 1, 1, 1];

  const reels = [1, 1, 1, 1, 1];

  const savedPost = [1, 1, 1];

  return (
    <Card className='my-10 w-[70%]'>
      <div className="rounded-md">
        <div className="h-[15rem]">
          <img className='w-full h-full rounded-t-md' src="https://cdn.pixabay.com/photo/2022/03/27/12/46/chongqing-7094955_960_720.jpg" alt="" />
        </div>

        <div className='px-5 flex justify-between items-start mt-5 h-[5rem]'>
          <Avatar className='transform -translate-y-24' sx={{ width: '10rem', height: '10rem' }} src='https://cdn.pixabay.com/photo/2015/03/12/07/43/song-669786_640.jpg' />

          {true ? <Button sx={{ borderRadius: '20px' }} variant='outlined' onClick={() => handleOpenProfileModal() }>Edit Profile</Button> :
            <Button sx={{ borderRadius: '20px' }} variant='outlined'>Follow</Button>}
        </div>

        <div className="p-5">
          <div className='flex flex-col items-start'>
            <h1 className='py-1 font-bold text-xl'>{auth.user?.firstName + " " + auth.user?.lastName}</h1>
            <p>@{(auth.user.firstName + "_" + auth.user.lastName).toLowerCase()}</p>
          </div>

          <div className="flex gap-5 items-center py-3">
            <span>41 post</span>
            <span>35 followers</span>
            <span>5 followings</span>
          </div>

          <div className='flex items-start'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>

        <section>
          <Box sx={{ width: '100%', borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="wrapped label tabs example"
            >
              {tabs.map((tab) => <Tab key={tab.value} value={tab.value} label={tab.name} wrapped />)}
            </Tabs>
          </Box>

          <div className="flex justify-center">




            {
              value === "post"
                ?
                (
                  <div className='space-y-5 w-[70%] my-10'>
                    {posts.map((post, index) => (
                      <div className="border border-slate-100 rounded-md" key={index}>
                        <PostCard />
                      </div>
                    ))}
                  </div>
                )
                :
                value === "reels"
                  ?
                  (
                    <div className='flex justify-center flex-wrap gap-2 my-10'>
                      {reels.map((reel, index) => <UserReelCard key={index} />)}
                    </div>
                  )
                  :

                  value === "saved"
                    ?
                    (
                      <div className='space-y-5 w-[70%] my-10'>
                        {posts.map((post, index) => (<div className="border border-slate-100 rounded-md" key={index}>
                          <PostCard />
                        </div>))}

                      </div>)
                    : (
                      <div>Repost</div>
                    )
            }


          </div>
        </section>
      </div>

      <section>
        <ProfileModal open={open} handleClose={handleClose} />
      </section>
    </Card>
  )
}

export default Profile