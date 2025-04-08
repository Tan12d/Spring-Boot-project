import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Avatar, Card, CardHeader, IconButton } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const UserChatCard = ({ chat }) => {

    const { auth } = useSelector(store => store);

    console.log("auth --- ", auth);
    

    return (
        <Card>
            <CardHeader
        avatar={<Avatar
                sx={{
                    width: "3.5rem",
                    height: "3.5rem",
                    fontSize: "1.5rem",
                    bgcolor: "#191c29",
                    color: "#rgb(88, 199, 250)"
                }}
                src='https://images.pexels.com/photos/27591919/pexels-photo-27591919/free-photo-of-a-man-sitting-on-a-bench-outside-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />}
                action={
                    <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                }
                title={auth.user?.id===chat.users[0].id ? (chat.users[1].firstName + " " + chat.users[1].lastName) : (chat.users[0].firstName + " " + chat.users[0].lastName)}
                subheader={"new message"}
                >

        </CardHeader>
        </Card>
    )
}

export default UserChatCard