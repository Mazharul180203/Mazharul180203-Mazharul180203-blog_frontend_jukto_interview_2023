import React from 'react';
import InitialCreatePostView from '../../CreatePost/InitialView/InitialCreatePostView';
import PostItem from '../postItem/PostItem';
import './PostListRoot.css'
import PostService from '../../../services/Post.service';
function PostListRoot(props) {
    const [postList, setPostList] = React.useState(([]))
    const [pageNumber, setPageNumber] = React.useState(1)
    const [shouldReRender, serReRender] = React.useState(false)
    function getNewsFeed() {
        console.log(pageNumber)
        setTimeout(() => {
            PostService.fetchPosts(pageNumber)
                .then((feed) => {
                    setPostList(([...feed, ...(postList)]))
                    console.log(feed)
                    setPageNumber(pageNumber + 5)
                    serReRender(!shouldReRender)
                    getNewsFeed()
                })
        }, 30 * 1000)


    }
    React.useEffect(() => {
        PostService.fetchPosts(pageNumber)
            .then((feed) => {
                setPostList(([...feed, ...(postList)]))
                console.log(feed)
                setPageNumber(pageNumber + 5)
                // serReRender(!shouldReRender)
                getNewsFeed()
            })

    }, [shouldReRender])
    return (
        <div className='postsView'>
            <InitialCreatePostView shouldReRender={shouldReRender} setPostList={setPostList} serReRender={serReRender} postList={postList} />
            <PostsContainer postList={(postList)} />

        </div>
    );
}


function PostsContainer(props) {
    const postList = JSON.parse(JSON.stringify(props.postList))

    React.useEffect(() => { }, [postList])
    return <>
        {postList.map((post, index) => {
            //return <div></div>
            return <PostItem key={index} post={post} />
        })}
    </>
}

export default PostListRoot;