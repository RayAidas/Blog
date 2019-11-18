import React from 'react';
import InfoForm from '../components/InfoForm';
import TopBar from '../components/TopBar'
import '../../css/base.css';
import { findByName } from '../action/UserAction';

class UserInfo extends React.Component{

  constructor(props){
    super(props);
    this.state={
      username:localStorage.getItem('name'),
      userInfo:{}
    }
  }

  async componentDidMount(){
    const res = await findByName(this.state.username);
    this.setState({
      userInfo:res
    });
    console.log(res);
  }

  render() {
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
          <div className='main'>
            <h1>个人信息</h1>
            <InfoForm
              userInfo={this.state.userInfo}
            />
          </div>
        </div>    
      </div>
    );
  }
}

export default UserInfo;