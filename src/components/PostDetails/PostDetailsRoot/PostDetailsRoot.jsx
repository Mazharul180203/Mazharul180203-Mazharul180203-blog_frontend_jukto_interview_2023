import React from 'react';
import { useParams } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PostDeletionModal from '../../PostDeletionModal/PostDeletionModal';
import './PostDetailsRoot.css'
import PostService from '../../../services/Post.service'


function PostDetailsRoot(props) {

    const [postActionVisibility, setPostActionVisibility] = React.useState(false)
    const [postModificationModalVisibility, setPostModificationModalVisibility] = React.useState(false)
    const [tempPostInfo, setTempPostInfo] = React.useState({})
    const { id } = useParams()
    const [isOnEditMode, setEditMode] = React.useState(false)

    const [postDetails, setPostDetails] = React.useState({
        "td": "",
        "body": " ",
        'title': ''
    })
    const [newComment, setNewComment] = React.useState({})
    const [postComments, setPostComments] = React.useState([])
    function getPostComments() {
        PostService.getPostComments(id)
            .then(comments => {
                setPostComments(comments)
            })
    }
    function getPostInfo() {
        PostService.getPostInfo(id)
            .then(post => {
                setPostDetails(post)
            })
    }
    React.useEffect(() => {
        getPostInfo()
        getPostComments()
    }, [])

    return (
        <div className="mainPostDetailsContainer">

            <div></div>
            <div className="postDetailsContainer">
                <PostDeletionModal open={postModificationModalVisibility} handleClose={() => {
                    setPostModificationModalVisibility(false)
                }} postId={id} />
                <div style={{
                    textDecoration: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center'
                }}>

                    <div className='actionContainer'>
                        {postActionVisibility && <div className="postOptionContainer">
                            <div onClick={() => {
                                setPostModificationModalVisibility(true)
                            }} className="postOption">Delete</div>
                            <div onClick={() => {
                                setTempPostInfo({ ...postDetails })
                                setEditMode(true)
                            }} className="postOption">Update</div>
                        </div>}
                        <div onClick={() => {
                            setPostActionVisibility(!postActionVisibility);
                        }} style={{
                            cursor: 'pointer',

                        }}>
                            <MoreVertIcon className='moreBtn' />
                        </div>
                    </div>
                </div>
                {!isOnEditMode && <div className="postBodyContainer">
                    <h3 className="postText"> {postDetails.title} </h3>
                    <p className="postText">{postDetails.body}</p>
                </div>}
                {isOnEditMode && <div className="postBodyContainer">
                    <textarea name="" onChange={e => {
                        setPostDetails({ ...postDetails, title: e.target.value })
                    }} cols="30" rows="10" value={postDetails.title} ></textarea>

                    <textarea name="" onChange={e => {
                        setPostDetails({ ...postDetails, body: e.target.value })
                    }} cols="30" rows="10" value={postDetails.body} ></textarea>
                    <div className="flex">
                        <button onClick={() => {
                            setPostDetails({ ...tempPostInfo })
                            setEditMode(false)
                        }} > cancel </button>
                        <button onClick={() => {
                            PostService.updatePost(postDetails)
                                .then(postInfo => {
                                    setPostDetails(postInfo.data)
                                    setEditMode(false)
                                })
                        }} > confirm</button>
                    </div>
                </div>}

                <h2>Post comments</h2>

                {postComments.map((comment, index) => {
                    return <div key={index} className='comment'>
                        <h3 style={{
                            margin: 0
                        }}> {comment.email} </h3>
                        <h5 style={{
                            margin: 0
                        }}>{comment.name}</h5>
                        <h6 style={{
                            margin: 0
                        }}> {comment.body} </h6>
                    </div>
                })}
                <div className="postComment">
                    <form onSubmit={e => {
                        e.preventDefault();
                        setPostComments([...postComments, newComment])
                    }}>

                        <input type="text" name="" value={newComment.email} placeholder="email"
                            onChange={e => {
                                setNewComment({ ...newComment, email: e.target.value })
                            }}
                        />
                        <input type="text" name="" value={newComment.name} placeholder="name"
                            onChange={e => {
                                setNewComment({ ...newComment, name: e.target.value })
                            }}
                        />
                        <input type="text" name="" value={newComment.body} placeholder="body"
                            onChange={e => {
                                setNewComment({ ...newComment, body: e.target.value })
                            }}
                        />
                        <button type="submit">confirm</button>
                    </form>

                </div>
            </div>
            <div></div>
        </div>

    );
}

export default PostDetailsRoot;