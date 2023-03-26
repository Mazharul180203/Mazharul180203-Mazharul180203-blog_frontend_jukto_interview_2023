import React from 'react';
import './CreatePostModal.css'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';
import PostService from '../../../services/Post.service';
import CloseIcon from '@mui/icons-material/Close';
const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: window.innerWidth > 620 ? 400 : '75vw',
    bgcolor: '#242526',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function CreatePostModal(props) {
    const [postBody, setPostBody] = React.useState("")
    const [postTitle, setPostTitle] = React.useState("")
    React.useEffect(() => {

    }, [])

    return (
        <div className='createPostModalRoot'>
            <Modal keepMounted
                open={props.open}
                onClose={() => {
                    setPostBody('')

                    props.onClose()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={modalStyle}>
                    <div className="flex" style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <h2 className='createPostModalHeader'>
                            Create a post
                        </h2>
                        <div onClick={() => {
                            setPostBody('')

                            props.onClose()
                        }}>
                            <CloseIcon style={{
                                color: 'white'
                            }} />
                        </div>
                    </div>

                    <div id="modal-modal-description" sx={{ mt: 2 }}>
                        <div className="postCreatorContainer">
                        </div>
                        <div className="createPostTextContainer" style={{
                            margin: "10px"
                        }}>
                            <input type="text" className='postTextInput' name="" value={postTitle}
                                onChange={e => {
                                    setPostTitle(e.target.value)
                                }}
                            />
                            <textarea value={postBody} onChange={(e) => {
                                setPostBody(e.target.value)
                            }} style={{
                                resize: 'none'
                            }} className='postTextInput' name="" cols="30" rows="5"></textarea>
                        </div>

                        <div className="createPostBtn">
                            <Button onClick={() => {

                                PostService.createPost({
                                    title: postTitle,
                                    body: postBody,
                                    userId: 1,
                                })
                                    .then(post => {
                                        props.setPostList([post])
                                        props.serReRender(!props.shouldReRender)

                                        props.onClose()
                                    })
                            }} style={{
                                width: "100%",
                                margin: "10px 0px"
                            }} variant="contained">Done</Button>
                        </div>
                    </div>
                </Box>

            </Modal>

        </div>
    );
}



export default CreatePostModal;