import React from 'react';
import {Link} from 'react-router-dom';
import MediaQuery from 'react-responsive';
import { Menu, Dropdown, Icon } from 'antd';
import Model from './Model';
import '../../css/topbar.css';
import defaultAvatar from '../../img/default.jpg';
import {findByName} from '../action/UserAction';

class TopBar extends React.Component{
	constructor(props){
		super(props);
		this.state={
			avatarPath:null,
			currenUserName:localStorage.getItem('name')
		}
	}

	async componentDidMount(){
    if(localStorage.getItem('name')){
      const res = await findByName(localStorage.getItem('name'));
      this.setState({
        avatarPath:res.avatarPath
      });
    }
  }

	alertInfo(){
		alert('请登录');
	}

	render() {
		const avatar = {
      width:'30px',
      height:'30px',
      borderRadius:'50%',
      marginRight:'10px'
		}
		return (
			<div>
				<MediaQuery query = '(min-device-width:800px)' >
					<div className='topbar clearfix'>
						<div className='ll'>
							<div>
								<Link to='/'>首页</Link>
							</div>
						</div>
						<div className='lr'>
							<div>
								{
									this.state.currenUserName?
										<Link to='/writeBlog'>写博客</Link>:
										<Link onClick={this.alertInfo.bind(this)} to='/'>写博客</Link>
								}
							</div>
							<div>
								{
									this.state.currenUserName?
										<Link to='/myBlog'>我的博客</Link>:
										<Link onClick={this.alertInfo.bind(this)} to='/'>我的博客</Link>
								}	
							</div>
							<div><Model tag={'register'}/></div>
							<div><Model avatarPath={this.state.avatarPath} tag={'login'}/></div>
						</div>
					</div>
				</MediaQuery>
				<MediaQuery query = '(max-device-width: 800px)' >
				<div className='topbar clearfix'>
						<div className='ll'>
							<div>
								<Link to='/'>首页</Link>
							</div>
						</div>
						<div className='lr'>
						<Dropdown overlay={(
							<Menu>
								<Menu.Item key="0">
									<div><Model avatarPath={this.state.avatarPath} tag={'login'}/></div>
								</Menu.Item>
								<Menu.Item key="1">
									<div>
										{
											this.state.currenUserName?
												<Link to='/writeBlog'>写博客</Link>:
												<Link onClick={this.alertInfo.bind(this)} to='/'>写博客</Link>
										}
									</div>
								</Menu.Item>
								<Menu.Item key="2">
									<div>
										{
											this.state.currenUserName?
												<Link to='/myBlog'>我的博客</Link>:
												<Link onClick={this.alertInfo.bind(this)} to='/'>我的博客</Link>
										}	
									</div>
								</Menu.Item>
								<Menu.Item key="3">
								<div><Model tag={'register'}/></div>
								</Menu.Item>
							</Menu>
							)} trigger={['click']}>
							<div className="ant-dropdown-link" href="#">
								<a>
									<img style={avatar} src={this.state.avatarPath?this.state.avatarPath:defaultAvatar}/>
									{
										localStorage.getItem('name')?
											localStorage.getItem('name'):
											'未登录'
									}
								</a> <a><Icon type="down" /></a>
							</div>
						</Dropdown>
						</div>
					</div>
				</MediaQuery>
			</div>
		);
	}
}

export default TopBar;