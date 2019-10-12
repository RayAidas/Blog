import React from 'react';
import { HashRouter as Router, Route,BrowserRouter } from 'react-router-dom';
import Index from '../containers/Index';
import UserInfo from '../containers/UserInfo';
import WriteBlog from '../containers/WriteBlog';
import MyBlog from '../containers/MyBlog';
import ArticleDetail from  '../containers/ArticleDetail';

class RouteMap extends React.Component{
    render() {
        return (
         <Router>
            <Route exact path='/' component={Index} />
            <Route path='/userInfo' component={UserInfo}/>
            <Route path='/writeBlog' component={WriteBlog}/>
            <Route path='/myBlog' component={MyBlog}/>
            <Route path='/list/:author' component={MyBlog}/>
            <Route path='/detail/:id' component={ArticleDetail}/>
        </Router>
        );
    }
}
export default RouteMap;
