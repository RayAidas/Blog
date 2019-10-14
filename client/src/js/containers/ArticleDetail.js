import React from 'react';
import moment from 'moment';
import TopBar from '../components/TopBar';
import Comment from '../components/Comment';
import {getArticleById} from '../action/BlogAction';
import {findByName} from '../action/UserAction';
import {getCommentByArticleId} from '../action/CommentAction';

class ArticleDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:localStorage.getItem('name'),
      article:[],
      content:null,
      userInfo:{},
      comments:[]
    };
  }

  async componentDidMount(){
    const username = this.state.username;
    const id = this.props.match.params.id;
    const tag = await getArticleById(id);
    const comments = await getCommentByArticleId(id);
    let filter = tag.content.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
    if(username){
      const res = await findByName(username);
      this.setState({
        article:tag,
        content:filter,
        userInfo:res,
        comments:comments
      });
    }else{
      this.setState({
        article:tag,
        content:filter,
        comments:comments
      });
    }
  }
  async commentChange(articleId){
    const comments = await getCommentByArticleId(articleId);
    this.setState({
      comments:comments
    });
    console.log(comments);
  }
  
  render() {
    const {article,content,comments} = this.state;
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
          <div className='main' style={{
            minHeight:document.body.clientHeight-50
          }}>
            <blockquote>
              <p>{article.description}</p>
            </blockquote>
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              style={{whiteSpace:'pre-wrap',fontWeight:' 400',marginBottom: '1.5rem'}}
            ></div>
          </div>
          <div className='comment'>
            <h3>评论</h3>
            <ul>
              {
                comments.map((comment,index) => (
                  <li key={index}>
                    <p>
                      <span className='first'>{comment.userName}</span> 
                      <span>{comment.commentContent}</span> 
                      <span>{moment(comment.commentTime).format('l')}</span></p>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <Comment
          userInfo = {this.state.userInfo}
          ArticleId = {this.props.match.params.id}
          commentChange = {this.commentChange.bind(this)}
        />
      </div>
    );
  }
}

export default ArticleDetail;