import React from 'react';
import {Pagination} from 'antd';
import moment from 'moment';
import TopBar from '../components/TopBar';
import Reply from '../components/Reply';
import Comment from '../components/Comment';
import {getArticleById,updateCommentNum} from '../action/BlogAction';
import {findByName} from '../action/UserAction';
import {getCommentByArticleId,getAllCommentByArticleId,deleteComment} from '../action/CommentAction';
import {getAllreplyByArticleId} from '../action/ReplyAction';

class ArticleDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      username:localStorage.getItem('name'),
      article:[],
      content:null,
      userInfo:{},
      comments:[],
      commentsTotal:0,
      current:1,
      pageSize:10,
      styleTag:false,
      currentIndex:null,
      replies:[]
    };
  }

  async componentDidMount(){
    const username = this.state.username;
    const id = this.props.match.params.id;
    const article = await getArticleById(id);
    const comments = await getCommentByArticleId(id);
    const commentsTotal = await getAllCommentByArticleId(id);
    const replies = await getAllreplyByArticleId(id);
    let filter = article.content.replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
    if(username){
      const res = await findByName(username);
      this.setState({
        article:article,
        content:filter,
        userInfo:res,
        comments:comments,
        commentsTotal:commentsTotal.length,
        replies:replies
      });
    }else{
      this.setState({
        article:article,
        content:filter,
        comments:comments,
        replies:replies
      });
    }
  }
  async commentChange(articleId){
    const comments = await getCommentByArticleId(articleId,this.state.current,this.state.pageSize);
    const commentsTotal = await getAllCommentByArticleId(this.state.article._id);
    const article = await getArticleById(articleId);
    const num = article.comment;
    const test = await updateCommentNum(articleId,num);
    console.log(test);
    this.setState({
      comments:comments,
      commentsTotal:commentsTotal.length
    });
  }
  async replyChange(articleId){
    const replies = await getAllreplyByArticleId(articleId);
    this.setState({
      replies:replies
    })
  }
  async deleteComment(commentId){
    const res = await deleteComment(commentId);
    const comments = await getCommentByArticleId(this.state.article._id);
    console.log(res);
    this.setState({
      comments:comments
    })
  }

  async onShowSizeChange(current, pageSize) {
		console.log(current, pageSize);	
		let c=current;
		let p=pageSize;
    const res = await getCommentByArticleId(this.state.article._id,c,p);
		this.setState({
      comments: res,
    });
  }
  
  async onClick(current,pageSize){
		let c=current;
    let p=pageSize;
    const res = await getCommentByArticleId(this.state.article._id,c,p);
		this.setState({
      comments: res,
      current:c,
      pageSize:p,
    });
  }

  showReply(index){
    if(this.state.currentIndex==index){
      this.setState({
        currentIndex:null
      });
    }else{
      this.setState({
        currentIndex:index
      });
    }
  }
  
  render() {
    const {article,content,comments,replies} = this.state;
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
          <div className='main'>
            <blockquote>
              <p>{article.description}</p>
            </blockquote>
            <div 
              dangerouslySetInnerHTML={{ __html: content }} 
              style={{whiteSpace:'pre-wrap',fontWeight:' 400',marginBottom: '1.5rem'}}
            ></div>
          </div>
          <div className='comments'>
            <h2>评论</h2>
            <ul>
              {
                comments.map((comment,index) => (
                  <li key={index} className='comment'>
                    <p>
                      <span className='first name'>{comment.userName}</span> 
                    </p>
                    <p>
                      {
                        comment.commentState?
                          <span className='content'>{comment.commentContent}</span>:
                          <span>该评论已删除</span>
                      }
                       
                    </p>
                    <p>
                      <span>{moment(comment.commentTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                      <span><a onClick={this.showReply.bind(this,index)}>回复({comment.replys})</a></span>
                      {
                        article.author==this.state.userInfo.name || this.state.userInfo.name==comment.userName?
                          <span><a onClick={this.deleteComment.bind(this,comment._id)}>删除</a></span>:
                          null
                      }
                    </p>
                    <ul className='replies'>
                      {
                        replies.map((reply,r_index)=>(
                          reply.topicId==comment._id?
                            <li key={r_index}>
                              <div>
                                {
                                  reply.isLv3==false?
                                    <p>
                                      <span className='first fromUser'>{reply.fromUserName}</span>
                                      <span className='content'>{reply.toUserContent}</span>
                                    </p>:
                                    <p>
                                      <span className='first'>{reply.fromUserName}</span>
                                      <span>回复</span>
                                      <span className='toUser'>{reply.toUserName}</span>
                                      <span className='content'>{reply.toUserContent}</span>
                                    </p>
                                }
                                
                                <p>
                                  <span className='first'>{moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                                  <span><a>回复</a></span>
                                  {
                                    this.state.userInfo.name==reply.fromUserName?
                                    <span><a>删除</a></span>:
                                    null
                                  }
                                </p>
                              </div>
                              <p></p>
                            </li>:
                            null
                        ))
                      }
                    </ul>
                    <div style={{display:(index===this.state.currentIndex) ? "block" : "none"}}>
                      <Reply
                        userInfo = {this.state.userInfo}
                        ArticleId = {this.props.match.params.id}
                        comment = {comment}
                        replyChange = {this.replyChange.bind(this)}
                      />
                    </div>
                  </li>
                ))
              }
            </ul>
            <div>
              <Pagination
                style={{textAlign:'center'}}
                showSizeChanger
                onShowSizeChange={this.onShowSizeChange.bind(this)}
                defaultCurrent={1}
                total={this.state.commentsTotal}
                onChange={this.onClick.bind(this)}
                hideOnSinglePage={ true }
              />
            </div>
          </div>
          <Comment
            userInfo = {this.state.userInfo}
            ArticleId = {this.props.match.params.id}
            commentChange = {this.commentChange.bind(this)}
          />
        </div>
        
      </div>
    );
  }
}

export default ArticleDetail;