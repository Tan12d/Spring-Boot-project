import { Avatar } from '@mui/material'
import React from 'react'

const StoryCircle = () => {
    return (
        <div>
            <div className='flex flex-col items-center mr-4 cursor-pointer'>

                <Avatar
                    sx={{ width: "5rem", height: "5rem" }}
                src='https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_960_720.jpg' 
                >
                    </Avatar>
                <p>codewith...</p>
            </div>
        </div>
    )
}

export default StoryCircle