import React, { Component } from 'react';
import NavigationBar from '../Components/Common/Navbar/NavigationBar';
import Footer from '../Components/Common/Footer/Footer';

function Layout({children}){
	return(
		<>
			<NavigationBar />
			<div>
				{children}
			</div>
			<Footer/>
		</>
	)
}

export default Layout;