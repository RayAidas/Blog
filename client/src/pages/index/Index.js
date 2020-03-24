import React from 'react';
import TopBar from '../../components/topBar/TopBar';
import Main from '../../components/main/Main';

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