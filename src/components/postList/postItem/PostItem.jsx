import React from 'react';
import './PostItem.css'
import { Link } from 'react-router-dom';
function PostItem(props) {
    const post = props.post
    React.useEffect(() => {

    }, [])
    return (
        <div className='postBody'>

            <Link to={`post/${post.id}`} style={{ textDecoration: 'none' }}>
                <div className="postContent">
                    <h2 className="postText"> {post.title}  </h2>
                    <p className="postText">{post.body}</p>

                </div>
            </Link>


        </div>
    );
}

export default PostItem;