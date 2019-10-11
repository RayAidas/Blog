import React from 'react';
import TopBar from '../components/TopBar';
import Main from '../components/Main';

class Index extends React.Component{
	render() {
		return (
			<div>
				<TopBar/>
				<Main/>
			</div>
		);
	}
}

export default Index;