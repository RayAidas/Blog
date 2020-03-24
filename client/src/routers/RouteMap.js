import React from 'react';
import { HashRouter as Router, Route,BrowserRouter } from 'react-router-dom';
import Index from '../pages/Index';
import UserInfo from '../pages/info/UserInfo';
import WriteBlog from '../pages/submit/WriteBlog';
import MyBlog from '../pages/my/MyBlog';
import ArticleDetail from '../pages/detail/ArticleDetail';
import UploadAvatar from '../pages/upload/UploadAvatar';

class RouteMap extends React.Component {
	render() {
		return ( 
				<Router>
					<Route exact path='/' component={Index} />
					<Route path='/userInfo' component={UserInfo}/>
					<Route path='/writeBlog' component={WriteBlog}/>
					<Route path='/myBlog' component={MyBlog}/>
					<Route path='/list/:author' component={MyBlog}/>
					<Route path='/detail/:id' component={ArticleDetail}/>
					<Route path='/revise/:id' component={WriteBlog}/>
					<Route path='/avatar' component={UploadAvatar}/>
				</Router>
		);
	}
}
export default RouteMap;