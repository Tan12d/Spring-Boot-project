import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { Avatar, Backdrop, Button, CircularProgress, IconButton } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { uploadToCloudinary } from '../../utils/uploadToCloudnary';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../Redux/Post/post.action';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none"
};

const CreatePostModal = ({ open, handleClose }) => {

    
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    
    const handleSelectImage = async (event) => {
        setIsLoading(true);
        const imageUrl = await uploadToCloudinary(event.target.files[0], "image");
        setSelectedImage(imageUrl);
        setIsLoading(false);
        formik.setFieldValue("image", imageUrl);
    };
    
    const handleSelectVideo = async (event) => {
        setIsLoading(true);
        const videoUrl = await uploadToCloudinary(event.target.files[0], "video");
        setSelectedVideo(videoUrl);
        setIsLoading(false);
        formik.setFieldValue("video", videoUrl);
    };

    const formik = useFormik({
        initialValues: {
            caption: "",
            image: "",
            video: ""
        },
        onSubmit: (values,) => {
            console.log("formik values ", values);        
            dispatch(createPostAction(values));    
        }
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="flex space-x-4 items-center">
                            <Avatar />
                            <div>
                                <p className='font-bold text-lg'>Code With Zosh</p>
                                <p className='text-sm'>@codewithzosh</p>
                            </div>
                        </div>

                        <textarea className='outline-none w-full mt-5 p-2 bg-transparent border border-[#3b4054] rounded-sm' placeholder='write caption' name="caption" id="" onChange={formik.handleChange} value={formik.values.caption} rows={4}></textarea>

                        <div className='flex space-x-5 items-center mt-5'>
                            <div>
                                <input type="file" accept='image/*' onChange={handleSelectImage}
                                    style={{ display: "none" }} 
                                    id='image-input' />
                                <label htmlFor="image-input">
                                    <IconButton color='primary' component='span'>
                                        <ImageIcon />
                                    </IconButton> 
                                </label>
                                <span>Image</span>
                            </div>

                            <div>
                                <input type="file" accept='video/*' onChange={handleSelectVideo}
                                    style={{ display: "none" }} id='video-input' />
                                <label htmlFor="video-input">
                                    <IconButton color='primary'
                                    component='span'>
                                        <VideoCallIcon />
                                    </IconButton>
                                </label>
                                <span>Video</span>
                            </div>

                        </div>

                        {selectedImage && <div>
                            <img className='h-[10rem]' src={selectedImage} alt="" />
                        </div>}

                        {selectedVideo && <div>
                            <video controls className='h-[10rem]' src={selectedVideo} alt="" />
                        </div>}

                        <div className='flex w-full justify-end'>
                            <Button sx={{ borderRadius: "1.5rem" }} variant='contained' type='submit'>Post</Button>
                        </div>

                    </div>
                </form>

                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={isLoading}
                    onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Modal>
    )
}

export default CreatePostModal