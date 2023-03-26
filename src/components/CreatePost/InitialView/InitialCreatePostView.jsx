import React from 'react';
import './InitialCreatePostView.css'
import CreatePostModal from '../CreatePostModal/CreatePostModal';

function InitialCreatePostView(props) {
    const [canShowCreatePostModal, toggleCreatePostModalVisible] = React.useState(false)
    return (
        <>  <div className='createPostInitialViewRoot'>
            <p className="headingTextCreatePost">Create a post</p>
            <div className="createPostInitContainer">
                <div className="userImgContainer">
                    {/* <img src={Globals.BASEURL + currentUser.profileImage} alt="" className="userImg" /> */}
                </div>
                <div className="textContainer" onClick={() => {
                    toggleCreatePostModalVisible(true)
                }}>
                    <p className="containerText">What's on your mind?</p>
                </div>
            </div>
        </div>

            <CreatePostModal open={canShowCreatePostModal} {...props} onClose={(post) => {

                toggleCreatePostModalVisible(false)

            }} />
        </>

    );
}

export default InitialCreatePostView;