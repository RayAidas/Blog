import React from 'react';
import TopBar from '../components/TopBar';
import WriteBlogForm from '../components/WriteBlogForm';
import '../../css/base.css';
import { findByName } from '../action/UserAction';

class WriteBlog extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      userId:null
    };
  }

  async componentDidMount(){
    const res = await findByName(localStorage.getItem('name'));
    console.log(res);
    this.setState({
      userId:res._id
    })
  }

  render() {
    return (
      <div className='wrap'>
        <TopBar/>
        <div className='main' style={{
        minHeight:document.body.clientHeight-50
        }}>
          <h1>写博客</h1>
          <WriteBlogForm
            id={this.state.userId}
          />
        </div>
      </div>
    );
  }
}

export default WriteBlog;