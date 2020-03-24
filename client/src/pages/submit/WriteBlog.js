import React from 'react';
import TopBar from '../../components/topBar/TopBar';
import WriteBlogForm from '../../components/submit/WriteBlogForm';
import './submit.css';
import { findByName } from '../../action/UserAction';
import {getArticleById} from '../../action/BlogAction';

class WriteBlog extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      userId:null,
      article:[],
      tag:'write'
    };
  }

  async componentDidMount(){
    var articleId = this.props.match.params.id;
    if(articleId){
      const article = await getArticleById(articleId);
      this.setState({
        article:article,
        tag:'revise'
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
      <div>
        <TopBar/>
        <div className='main'>
          <h1>写博客</h1>
          <WriteBlogForm
            tag = {this.state.tag}
            id = {this.state.userId}
            article = {this.state.article}
          />
        </div>
      </div>
    );
  }
}

export default WriteBlog;