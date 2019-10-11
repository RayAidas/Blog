import React from 'react';
import {Link} from 'react-router-dom';
import Model from './Model';
import '../../css/topbar.css';

class TopBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			currenUserName:localStorage.getItem('name')
		}
	}

	alertInfo(){
		alert('请登录');
	}

	render() {
		return (
			<div className='topbar clearfix'>
				<div className='ll'>
					<div>
						<Link to='/'>首页</Link>
					</div>
				</div>
				<div className='lr'>
					<div>
						<Link to='/writeBlog'>写博客</Link>
					</div>
					<div>
						{
							this.state.currenUserName?
								<Link to='/myBlog'>我的博客</Link>:
								<Link onClick={this.alertInfo.bind(this)} to='/'>我的博客</Link>
						}
						
					</div>
					<div><Model tag={'register'}/></div>
					<div><Model tag={'login'}/></div>
				</div>
			</div>
		);
	}
}

export default TopBar;