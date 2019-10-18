import React from 'react';
import TopBar from '../components/TopBar';
import {Button,Pagination } from 'antd';
import moment from 'moment';
import {Link} from 'react-router-dom';
import '../../css/base.css';
import {getAllListByName,getListByName} from '../action/BlogAction';

class UserBlog extends React.Component{
  constructor(props){
    super(props);
    this.state={
      userName:localStorage.getItem('name'),
      articles:[],
      total:0
    }
  }

  async stateFunction() {
    const total = await getAllListByName(this.state.userName);
    const res = await getListByName(this.state.userName);
      this.setState({
        articles:res,
        total:total.length
      });
 }

  async componentDidMount() {
    const name=this.props.match.params.author;
    if(name){
      this.setState({
        userName:name
      },function(){
        this.stateFunction()
      });
    }else{
      this.setState({
        userName:localStorage.getItem('name')
      },function(){
        this.stateFunction()
      });
    }
  }
  
  async onShowSizeChange(current, pageSize) {
		console.log(current, pageSize);	
		let c=current;
		let p=pageSize;
    const res = await getListByName(this.state.userName,c,p);
		this.setState({
			articles: res,
		});
	}

	async onClick(current,pageSize){
		let c=current;
		let p=pageSize;
    const res = await getListByName(this.state.userName,c,p);
    console.log('onclick');
		this.setState({
			articles: res,
		});
  }
  
  filterHTMLTag(msg) {  
    var msg = msg.replace(/<\/?[^>]*>/g, ''); //去除HTML Tag
    msg = msg.replace(/[|]*\n/, '') //去除行尾空格
    msg = msg.replace(/&npsp;/ig, ''); //去掉npsp
    return msg;
  }


  render() {
    let filterHTMLTag;
    const {articles} = this.state;
    return (
      <div>
        <TopBar/>
        <div className='wrap'>
          <div className='main'>
            <h1>{this.state.userName}的博客</h1>
            <ul style={{margin:0}}> 
              {
                articles.map((article, index) => ( 
                  <li className='list' key = {index} >
                    <Link to={{
                      pathname:`/detail/${article._id}`,
                    }}>
                      <h3>
                        <span className='statement'>{article.statement}</span>
                        <span className='title'>{article.title}</span>
                      </h3>
                    </Link>
                    <span>{article.tag}</span>
                    <p className='content'>
                      {filterHTMLTag=this.filterHTMLTag(article.content)}
                    </p> 
                    <p className='info'>
                      <span className='first'>by {article.author} </span>
                      <span> {moment(article.createTime).format('YYYY-MM-DD HH:mm:ssl')}</span>
                      <span>浏览次数:{article.views}</span>
                      <span>评论:{article.comment}</span>
                      {
                        this.props.match.params.author?
                          <span></span>:
                          <span>
                            <Link to={{
                              pathname:`/revise/${article._id}`,
                            }}>修改</Link>  
                            <a>删除</a>
                          </span>
                      }
                    </p>
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
                total={this.state.total}
                onChange={this.onClick.bind(this)}
                hideOnSinglePage={ true }
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserBlog;