import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Divider } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/Post/post.action';
import { isLikedByReqUser } from '../../utils/isLikedByReqUser';

const PostCard = ({ item }) => {

    const dispatch = useDispatch();    

    const { auth } = useSelector(store => store);

    const [showComments, setShowComments] = useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleShowComment = () => setShowComments(!showComments);

    const handleCreateComment = (content) => {
        const reqData = {
            postId: item.id,
            data: {
                content
            }
        }
        dispatch(createCommentAction(reqData));
    }

    const handleLikePost = () => {
        dispatch(likePostAction(item.id));
    } 

    // console.log("Is like ", isLikedByReqUser(auth.user.id, item));
    

    return (
        <Card>
            <CardHeader
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // Avatar + title+subheader on left, IconButton on right
                }}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {item.user.firstName[0]}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <div style={{ float: "left" }}>
                        <span style={{ fontWeight: "lighter", display: "block" }}>
                            {item.user.firstName + "_" + item.user.lastName}
                        </span>
                        <span style={{ color: "gray", display: "block" }}>
                            {("@" + item.user.firstName + item.user.lastName).toLocaleLowerCase()}
                        </span>
                    </div>
                }
            />

            {/* <CardMedia
                component="img"
                height="100"
                image={item.image}
                alt="Paella dish"
            /> */}

            <img className='w-full max-h-[30rem] object-cover object-top' src={item.image} alt="" />

            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary', float: "left" }}>
                    {item.caption}
                </Typography>
            </CardContent>

            <CardActions className='flex justify-between w-[100%]'>
                <div>
                    <IconButton onClick={handleLikePost}>
                        {isLikedByReqUser(auth.user.id, item) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>

                    <IconButton>
                        {<ShareIcon />}
                    </IconButton>

                    <IconButton>
                        {<ChatBubbleIcon onClick={handleShowComment} />}
                    </IconButton>
                </div>

                <div>
                    <IconButton>
                        {true ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </div>
            </CardActions>

            {showComments && <section>
                <div className="flex items-center space-x-5 mx-3 my-5">
                    <Avatar sx={{}} />
                    <input type="text" className='w-full outline-none bg-transparent border border-[#3b4054] rounded-full px-5 py-2'
                        placeholder='write your comment...'
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleCreateComment(e.target.value)
                                console.log("enter pressed -----", e.target.value);
                                e.target.value = "";
                            }
                        }} />
                </div>

                <Divider />

                <div className="mx-3 space-y-2 my-5 text-xs">

                    {item.comments.map((comment) => <div className="flex items-center space-x-5" key={comment.id}>
                        <Avatar sx={{ height: "2rem", width: "2rem", fontSize: ".8rem" }}>
                            {comment.user.firstName[0]}
                        </Avatar>

                        <p>{comment.content}</p>
                    </div>)}

                </div>

            </section>}
        </Card>
    )
}

export default PostCard