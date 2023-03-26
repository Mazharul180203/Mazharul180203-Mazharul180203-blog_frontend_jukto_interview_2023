import React from "react";
import Home from "./components/home/Home";
import {
	useNavigate,
	Routes,
	Route,
	useLocation
} from "react-router-dom";
import PostDetailsRoot from "./components/PostDetails/PostDetailsRoot/PostDetailsRoot";
function App() {
	return (
		<div >

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/post/:id" element={<PostDetailsRoot />} />
			</Routes>
		</div>
	);
}

export default App;
