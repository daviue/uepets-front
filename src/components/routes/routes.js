import React 								from 'react';
import { BrowserRouter, Route, Routes } 	from 'react-router-dom';
import Home 								from '../../pages/Home/Home';
import Login 								from '../../pages/Login/Login';
import Logon 								from '../../pages/Logon/Logon';
import Feed 								from '../../pages/Feed/Feed';
import CreatePost 							from '../../pages/CreatePost/CreatePost';


const DefaultRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' 				element={<Home />}/>
				<Route path='/entrar' 			element={<Login />}/>
				<Route path='/cadastrar' 	    element={<Logon />}/>
				<Route path='/feed' 	    	element={<Feed />}/>
				<Route path='/feed/create' 	   	element={<CreatePost />}/>
				<Route path='*' 				element={<Home />} />
			</Routes>
		</BrowserRouter>

	);
};

export default DefaultRoutes;
