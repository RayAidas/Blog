import React from 'react';
import TopBar from '../components/TopBar';
import WriteBlogForm from '../components/WriteBlogForm';
import '../../css/base.css';
import { findByName } from '../action/UserAction';
import {getArticleById} from '../action/BlogAction';

class WriteBlog extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      userId:null,
      article:[]
    };
  }

  async componentDidMount(){
    var articleId = this.props.match.params.id;
    if(articleId){
      const article = await getArticleById(articleId);
      this.setState({
        article:article
      });
      console.log(this.state.article);
    }
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
        <div className='main'>
          <h1>写博客</h1>
          <WriteBlogForm
            tag = "write"
            id = {this.state.userId}
            article = {this.state.article}
          />
        </div>
      </div>
    );
  }
}

export default WriteBlog;