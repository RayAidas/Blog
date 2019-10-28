import React from 'react';
import {Pagination} from 'antd';
import moment from 'moment';
import TopBar from '../components/TopBar';
import Reply from '../components/Reply';
import Comment from '../components/Comment';
import {getArticleById,updateCommentNum} from '../action/BlogAction';
import {findByName} from '../action/UserAction';
import {getCommentByArticleId,getAllCommentByArticleId,deleteComment,updateReplyNum} from '../action/CommentAction';
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
      currentIndex:null,
      currentR_Index:null,
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
    const tag = await updateCommentNum(articleId,num);
    console.log(tag);
    this.setState({
      comments:comments,
      commentsTotal:commentsTotal.length
    });
  }
  async replyChange(articleId,commentId,replyNum){
    const article = await getArticleById(articleId);
    const num = article.comment;
    const tag1 = await updateCommentNum(articleId,num);
    console.log(tag1);
    const tag2 = await updateReplyNum(commentId,replyNum);
    console.log(tag2);
    const comments = await getCommentByArticleId(articleId);
    const replies = await getAllreplyByArticleId(articleId);
    this.setState({
      comments:comments,
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
        currentIndex:index,
        currentR_Index:null
      });
    }
  }

  showLVTReply(index){
    if(this.state.currentR_Index==index){
      this.setState({
        currentR_Index:null
      });
    }else{
      this.setState({
        currentR_Index:index,
        currentIndex:null
      });
    }
  }
  
  render() {
    const {userInfo,article,content,commentsTotal,comments,replies,currentR_Index,currentIndex} = this.state;
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
              style={{whiteSpace:'pre-wrap',wordWrap: 'break-word',fontWeight:' 400',marginBottom: '1.5rem'}}
            ></div>
          </div>
          <div className='comments'>
            <h2>评论</h2>
            {
              localStorage.getItem('name')?
                <div>
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
                            <span><a onClick={this.showReply.bind(this,index)}>回复({comment.replies})</a></span>
                            {
                              article.author==userInfo.name || userInfo.name==comment.userName?
                                <span><a onClick={this.deleteComment.bind(this,comment._id)}>删除</a></span>:
                                null
                            }
                          </p>
                          <div style={{display:(index===currentIndex) ? "block" : "none"}}>
                            <Reply
                              userInfo = {userInfo}
                              ArticleId = {this.props.match.params.id}
                              comment = {comment}
                              replyChange = {this.replyChange.bind(this)}
                            />
                          </div>
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
                                            <span className='first fromUser'>{reply.fromUserName}</span>
                                            <span>回复</span>
                                            <span className='toUser'>{reply.toUserName}</span>
                                            <span className='content'>{reply.toUserContent}</span>
                                          </p>
                                      }
                                      
                                      <p>
                                        <span className='first'>{moment(reply.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                                        {
                                          userInfo.name==reply.fromUserName?
                                            <span><a>删除</a></span>:
                                            <span><a onClick={this.showLVTReply.bind(this,r_index)}>回复</a></span>
                                        }
                                      </p>
                                    </div>
                                    <div style={{display:(r_index===currentR_Index) ? "block" : "none"}}>
                                        <Reply
                                          tag = {userInfo.name==reply.userName?'':'LV3'}
                                          userInfo = {userInfo}
                                          ArticleId = {this.props.match.params.id}
                                          comment = {comment}
                                          reply = {reply}
                                          replyChange = {this.replyChange.bind(this)}
                                        />
                                      </div>
                                  </li>:
                                  null
                              ))
                            }
                          </ul>
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
                      total={commentsTotal}
                      onChange={this.onClick.bind(this)}
                      hideOnSinglePage={ true }
                    />
                  </div>
                  <Comment
                    userInfo = {userInfo}
                    ArticleId = {this.props.match.params.id}
                    commentChange = {this.commentChange.bind(this)}
                  />
                </div>:
                <p>登录后可查看评论</p>
            }
            
          </div>
          
        </div>
        
      </div>
    );
  }
}

export default ArticleDetail;