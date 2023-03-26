import React from 'react';
import PostListRoot from '../postList/postListRoot/PostListRoot'
import './Home.css'

function Home(props) {
    React.useEffect(() => {
    }, [])
    return (
        <div>

            <div className="largeScreen">
                <div className="mainView">
                    <div  >

                    </div>
                    <div >

                        <PostListRoot />
                    </div>
                    <div >

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;